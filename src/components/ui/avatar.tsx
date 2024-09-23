import * as Avatar from '@radix-ui/react-avatar'

export default ({ imgSrc }: { imgSrc: string | null | undefined }) => (
  <Avatar.Root className="h-10 w-10">
    <Avatar.Image
      className="h-full w-full rounded-full object-cover"
      src={imgSrc || ''}
      alt="Colm Tuite"
    />
    <Avatar.Fallback />
  </Avatar.Root>
)
