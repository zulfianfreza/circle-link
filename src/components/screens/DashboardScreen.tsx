import React, { useState } from 'react'
import ContentContainer from '../ContentContainer'
import { trpc } from '~/utils/trpc'
import EmptyState from '../EmptyState'
import Logo from '../Logo'
import { CardHeader, CardLink } from '../card'
import {
  Draggable,
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'
import { Links } from '@prisma/client'
import { StrictModeDroppable } from '../StrictModeDroppable'
import AddLink from '../AddLink'
import { toast } from 'react-hot-toast'

export function DashboardScreen() {
  const [links, setLinks] = useState<Links[]>([])

  const { data, isLoading, refetch } = trpc.link.getLinks.useQuery(undefined, {
    onSuccess(data) {
      setLinks(data)
    },
  })

  const hotReloadIframe = async () => {
    const links = await refetch()
    const iframe = document.getElementById('preview-page') as HTMLIFrameElement

    if (!iframe) return

    iframe.contentWindow?.postMessage(
      {
        type: 'links-updated',
        links: links.data,
      },
      '*'
    )
  }

  const reorderMutation = trpc.link.reorderLinkPosition.useMutation({
    onSuccess: () => {
      refetch(), hotReloadIframe(), toast.success('success')
    },
  })

  const reorderLinksMutation = async (
    id: string,
    newIndex: number,
    oldIndex: number
  ) => {
    reorderMutation.mutateAsync({ linkId: id, newIndex, oldIndex })
  }

  const reorderLinks = async (result: DropResult) => {
    const id = result.draggableId
    const newIndex = result.destination?.index ?? -1
    const oldIndex = result.source.index
    const { source, destination, draggableId } = result

    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return
    }

    const newLinks = [...links]
    const [removed] = newLinks.splice(source.index, 1)
    newLinks.splice(destination.index, 0, removed!)

    setLinks(newLinks as Links[])

    console.log(newIndex, oldIndex)

    if (id && newIndex >= 0 && oldIndex >= 0) {
      await reorderLinksMutation(id, newIndex, oldIndex)
    }
  }

  return (
    <ContentContainer>
      <AddLink refetch={hotReloadIframe} />
      {isLoading ? (
        <div className=' flex h-full w-full flex-col items-center justify-center gap-y-4'>
          <Logo />
        </div>
      ) : links?.length == 0 ? (
        <EmptyState />
      ) : (
        <DragDropContext onDragEnd={reorderLinks}>
          <StrictModeDroppable droppableId='links'>
            {(provided) => (
              <ul
                className='links mt-8 flex w-full flex-col gap-y-4'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {links?.map((link, i) => (
                  <Draggable draggableId={link.id} key={link.id} index={i}>
                    {(provided) => (
                      <li
                        className=' hover:cursor-default'
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                      >
                        {link.type == 'link' ? (
                          <CardLink
                            link={link}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : link.type == 'header' ? (
                          <CardHeader
                            link={link}
                            refetch={refetch}
                            hotReload={hotReloadIframe}
                          />
                        ) : null}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      )}
    </ContentContainer>
  )
}
