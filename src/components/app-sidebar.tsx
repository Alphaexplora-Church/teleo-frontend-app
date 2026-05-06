"use client"

import * as React from "react"
import {
  Book,
  Church,
  CircleQuestionMark,
  Command,
  Contact,
  Mail,
  Settings,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      isActive: true,
    },
    {
      title: "Church",
      url: "/church",
      icon: Church,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Mail,
      isActive: true,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: true,
    },
    {
      title: "App Guide",
      url: "/app-guide",
      icon: Book,
      isActive: true,
    },
    {
      title: "FAQ",
      url: "/faq",
      icon: CircleQuestionMark,
      isActive: true,
    },
    {
      title: "Contact Us",
      url: "/contact",
      icon: Contact,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "App Guide",
      url: "/app-guide",
      icon: Book,
      isActive: true,
    },
    {
      title: "FAQ",
      url: "/faq",
      icon: CircleQuestionMark,
      isActive: true,
    },
    {
      title: "Contact Us",
      url: "/contact",
      icon: Contact,
      isActive: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <hr />
        <NavMain items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <Link to="/logout" className="text-red-500">
          Log Out
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
