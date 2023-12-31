import { trpc } from '~/utils/trpc'

export default function useSocialIcon() {
  const { data, refetch } = trpc.socialicon.getSocialIcon.useQuery()

  const hotReloadIframe = async () => {
    const socialIcon = await refetch()
    const iframe = document.getElementById('preview-page') as HTMLIFrameElement

    if (!iframe) return

    iframe.contentWindow?.postMessage(
      {
        type: 'socialicon-updated',
        socialIcon: socialIcon.data,
      },
      '*'
    )
  }

  return {
    data,
    hotReloadIframe,
  }
}
