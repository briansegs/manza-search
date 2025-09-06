import { CMSLinkType } from '@/components/Link'

export const isValidLink = (link?: CMSLinkType) => {
  if (link) {
    return (link.type === 'reference' && !!link.reference) || (link.type === 'custom' && !!link.url)
  }
  return false
}
