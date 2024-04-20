import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'

interface MobileMenuProps {
  open: boolean
}

export function MobileMenu({ open }: MobileMenuProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.15,
        staggerChildren: 0.05,
        ease: [0.24, 0.25, 0.05, 1],
      },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  }

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: [0.24, 0.25, 0.05, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  }

  const AccordionMenuItem = ({ menuItem }: any) => (
    <>
      {menuItem.title === 'Product' ? (
        Object.values(menuItem.subMenu)?.map((component: any) => (
          <MenuItem
            key={component.name}
            title={component.name}
            href={component.url}
            description={component.description_short}
            icon={component.icon}
          />
        ))
      ) : menuItem.title === 'Developers' ? (
        <div className='mb-2 flex flex-col gap-2 px-3'>
          {menuItem.subMenu['navigation'].map((column: any) => (
            <div key={column.label} className='flex flex-col gap-3'>
              {column.label !== 'Developers' && (
                <label className='mt-4 font-mono text-xs uppercase tracking-widest text-muted'>
                  {column.label}
                </label>
              )}
              {column.links.map((link: any) => (
                <TextLink
                  hasChevron={false}
                  key={link.text}
                  url={link.url}
                  label={link.text}
                  className='focus-visible:ring-offset-background-overlay !mt-0 focus-visible:ring-offset-4'
                />
              ))}
            </div>
          ))}

          <div className='flex flex-col py-2'>
            <label className='font-mono text-xs uppercase tracking-widest text-muted'>
              Troubleshooting
            </label>
            <TextLink
              hasChevron={false}
              url={menuItem.subMenu['footer']['support'].url}
              label={menuItem.subMenu['footer']['support'].text}
              className='focus-visible:ring-offset-background-overlay focus-visible:ring-offset-4'
            />
            <TextLink
              hasChevron={false}
              url={menuItem.subMenu['footer']['systemStatus'].url}
              label={menuItem.subMenu['footer']['systemStatus'].text}
              className='focus-visible:ring-offset-background-overlay focus-visible:ring-offset-4'
            />
          </div>
        </div>
      ) : null}
    </>
  )

  const Menu = () => (
    <Accordion
      type='default'
      openBehaviour='multiple'
      size='large'
      className='space-y-1'
      justified
      chevronAlign='right'
    >
      {menu.primaryNav.map((menuItem: any) => (
        <m.div
          variants={listItem}
          className='border-b [&>div]:!rounded-none'
          key={menuItem.title}
        >
          {menuItem.hasDropdown ? (
            <Accordion.Item
              header={menuItem.title}
              id={menuItem.title}
              className='hover:bg-surface-200 relative block py-2 pl-3 pr-4 text-base font-medium text-foreground'
            >
              <AccordionMenuItem menuItem={menuItem} />
            </Accordion.Item>
          ) : (
            <Link
              href={menuItem.url}
              className='hover:bg-surface-200 focus-visible:ring-foreground-lighter block py-2 pl-3 pr-4 text-base font-medium text-foreground focus-visible:rounded focus-visible:outline-none focus-visible:ring-2'
            >
              {menuItem.title}
            </Link>
          )}
        </m.div>
      ))}
    </Accordion>
  )

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode='wait'>
        {open && (
          <m.div
            variants={container}
            initial='hidden'
            animate='show'
            exit='exit'
            className='fixed inset-0 z-50 h-screen max-h-screen w-screen transform overflow-y-auto px-4 pb-32 pt-20 supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]'
          >
            <Menu />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

export default MobileMenu
