import { ICON_MD } from '@/ui/utils/CONSTS'
import { motion, type SVGMotionProps } from 'framer-motion'

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill='transparent'
    strokeWidth='2'
    stroke='hsl(0, 0%, 18%)'
    strokeLinecap='round'
    {...props}
  />
)

interface HamburgerIconsProps {
  isOpen: boolean
}

export function HamburgerIcons({ isOpen }: HamburgerIconsProps) {
  return (
    <motion.svg
      width={ICON_MD}
      height={ICON_MD}
      viewBox={`0 0 ${ICON_MD} ${ICON_MD}`}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <Path
        variants={{
          closed: { d: 'M 2 7.5 L 22 7.5' },
          open: { d: 'M 18 6 6 18' },
        }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 17.346 L 22 17.346' },
          open: { d: 'm6 6 12 12' },
        }}
      />
    </motion.svg>
  )
}
