"use client"

import { cn } from "../lib/utils"
import { IconLayoutNavbarCollapse } from "@tabler/icons-react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import { useRef, useState } from "react"

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  )
}

const FloatingDockMobile = ({ items, className }) => {
  return (
    <div className={cn("fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 block md:hidden", className)}>
      <motion.div 
        className="flex items-center gap-2 rounded-2xl bg-purple-900/80 backdrop-blur-lg px-4 py-3 border border-purple-500/30"
        style={{
          boxShadow: '0 0 20px rgba(134, 26, 133, 0.4), 0 0 40px rgba(81, 47, 141, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-800/30 hover:bg-purple-700/50 transition-all border border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <div className="h-5 w-5 text-purple-200 hover:text-purple-100 transition-colors">
              {item.icon}
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  )
}

const FloatingDockDesktop = ({ items, className }) => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "fixed top-6 left-1/2 opacity-90 transform -translate-x-1/2 z-50 hidden md:flex items-center gap-16 rounded-2xl bg-purple-900/80 backdrop-blur-lg px-4 py-3 border border-purple-500/40 shadow-2xl",
        className,
      )}
      style={{
        boxShadow: '0 0 30px rgba(134, 26, 133, 0.5), 0 0 60px rgba(81, 47, 141, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  )
}

function IconContainer({ mouseX, title, icon, href }) {
  const ref = useRef(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const [hovered, setHovered] = useState(false)

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-purple-800/50 border border-purple-500/30"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-purple-500/50 bg-purple-800/90 backdrop-blur-sm px-2 py-0.5 text-xs whitespace-pre text-purple-100"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center text-purple-200">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  )
}
