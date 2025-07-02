import { FloatingDock } from "./floating-dock"
import { 
  IconHome, 
  IconCalendarEvent, 
  IconTrophy, 
  IconUsers, 
  IconBrandGithub, 
  IconCode,
  IconLayout2Filled,
  IconInfoCircle,
  IconMail
} from "@tabler/icons-react"

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: "#home",
    },
        {
      title: "about",
      icon: <IconLayout2Filled className="h-full w-full" />,
      href: "#home",
    },
    {
      title: "Schedule",
      icon: <IconCalendarEvent className="h-full w-full" />,
      href: "#schedule",
    },
    {
      title: "Prizes",
      icon: <IconTrophy className="h-full w-full" />,
      href: "#prizes",
    },
    {
      title: "Rules",
      icon: <IconCode className="h-full w-full" />,
      href: "#rules",
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full" />,
      href: "#contact",
    },
  ]

  return (
    <FloatingDock items={links} />
  )
}
