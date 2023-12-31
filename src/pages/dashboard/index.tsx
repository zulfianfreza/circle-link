import { Links } from '@prisma/client'
import { getSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import { toast } from 'react-hot-toast'
import AddLink from '~/components/AddLink'
import ContentContainer from '~/components/ContentContainer'
import EmptyState from '~/components/EmptyState'
import Logo from '~/components/Logo'
import { StrictModeDroppable } from '~/components/StrictModeDroppable'
import { CardHeader, CardLink } from '~/components/card'
import { DashboardScreen } from '~/components/screens'
import { DashboardTemplate } from '~/components/template'
import { prisma } from '~/server/db'
import { trpc } from '~/utils/trpc'

export default function DashboardPage() {
  const [links, setLinks] = useState<Links[]>([])

  const { data, isLoading, refetch } = trpc.link.getLinks.useQuery(undefined, {
    onSuccess(data) {
      setLinks(data)
    },
  })

  const dataLinks = links ? links : data

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
    <DashboardTemplate>
      <NextSeo title='Dashboard - Circle' />
      <ContentContainer>
        <AddLink refetch={hotReloadIframe} />
        {isLoading ? (
          <div className=' flex h-full w-full flex-col items-center justify-center gap-y-4'>
            <Logo />
          </div>
        ) : dataLinks?.length == 0 ? (
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
                  {dataLinks?.map((link, i) => (
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
    </DashboardTemplate>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  })

  if (user?.username == null || !user?.username) {
    return {
      redirect: {
        destination: '/information',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
