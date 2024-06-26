'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/ui/components/Accordion'
import { Button } from '@/ui/components/Button'
import { Link, useOnRouterChange } from '@/ui/router-events'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { useState } from 'react'
import { HamburgerIcons } from './HamburgerIcons'
import { MenuItem } from './MenuItem'
import { EndpointBase, EndpointGroup } from '@/schemas'
import { menu } from './menu.data'

function isEndpointGroup(item: EndpointBase | EndpointGroup): item is EndpointGroup {
  return 'sub_menu' in item
}

export function MobileMenu() {
  const [isRouting, setIsRouting] = useState(false) // Allows closing the menu when navigating
  const [open, setOpen] = useState(false)

  useOnRouterChange({
    onRouteChangeStart() {
      setIsRouting(true)
    },
    onRouteChangeComplete() {
      if (isRouting) {
        setIsRouting(false)
        setOpen(false)
      }
    },
  })

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

  return (
    <>
      <Button
        variant={{ intent: 'icon' }}
        onClick={() => setOpen((prev) => !prev)}
        className='border-0 bg-transparent shadow-none'
      >
        <HamburgerIcons isOpen={open} />
      </Button>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode='wait'>
          {open && (
            <m.div
              variants={container}
              initial='hidden'
              animate='show'
              exit='exit'
              className='fixed inset-0 top-[calc(4rem+1px)] z-50 h-[calc(100vh-(4rem+1px))] max-h-screen w-screen transform overflow-y-auto bg-background px-4 pb-32 pt-4 supports-[height:calc(100cqh-(4rem+1px))]:h-[calc(100cqh-(4rem+1px))] supports-[height:calc(100svh-(4rem+1px))]:h-[calc(100svh-(4rem+1px))]'
            >
              <Accordion type='multiple'>
                {Object.values(menu).map(
                  (
                    menuItem
                  ) => (
                    <m.div variants={listItem} key={menuItem.title}>
                      {isEndpointGroup(menuItem) ? (
                        <AccordionItem
                          value={menuItem.title}
                          className='relative block text-base font-medium text-foreground'
                        >
                          <AccordionTrigger className='px-3 hover:bg-slate-100 hover:no-underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground'>
                            {menuItem.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            {menuItem.sub_menu.map((menuItem: any) => (
                              <MenuItem
                                key={menuItem.title}
                                icon={menuItem.icon}
                                href={menuItem.url}
                                title={menuItem.title}
                                description={menuItem.description}
                                className='m-1'
                              />
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          href={menuItem.url}
                          className='block border-b py-4 pl-3 pr-4 text-base font-medium text-foreground hover:bg-slate-100 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground'
                        >
                          {menuItem.title}
                        </Link>
                      )}
                    </m.div>
                  ),
                )}
              </Accordion>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}
