import * as ToggleGroup from '@radix-ui/react-toggle-group'
import type { ReactNode } from 'react'

export default ({
  children,
  value,
}: { children: ReactNode; value: string }) => (
  <ToggleGroup.Root
    className="inline-flex bg-zinc-500 rounded shadow-[0_2px_10px] shadow-blackA4 space-x-px"
    type="single"
    defaultValue="center"
    aria-label="Text alignment"
  >
    <ToggleGroup.Item
      value={value}
      className="hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
    >
      {children}
    </ToggleGroup.Item>
  </ToggleGroup.Root>
)
