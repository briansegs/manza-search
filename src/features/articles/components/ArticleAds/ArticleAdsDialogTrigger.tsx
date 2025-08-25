import { DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getAdTypeBackgroundColor } from '@/utilities/getAdTypeBackgroundColor'
import { getAdTypeDescription } from '@/utilities/getAdTypeDescription'
import { ArticleAdTypeBadge } from './ArticleAdTypeBadge'
import { ImagePlaceholder } from '@/features/shared/components/ImagePlaceholder'
import { RenderMedia } from '@/features/shared/components/RenderMedia'
import { ArticleAdsDialogTriggerProps } from './types'
import { cn } from '@/utilities/ui'

export function ArticleAdsDialogTrigger({ groupImage, adType }: ArticleAdsDialogTriggerProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DialogTrigger className="cursor-pointer">
          {groupImage ? (
            <RenderMedia media={groupImage} />
          ) : (
            <ImagePlaceholder className="absolute inset-0" />
          )}

          {adType && <ArticleAdTypeBadge adType={adType} />}
        </DialogTrigger>
      </TooltipTrigger>

      {adType && (
        <TooltipContent
          className={cn('mt-4 border-0 font-semibold text-white', getAdTypeBackgroundColor(adType))}
          side="right"
          sideOffset={0}
        >
          {getAdTypeDescription(adType)}
        </TooltipContent>
      )}
    </Tooltip>
  )
}
