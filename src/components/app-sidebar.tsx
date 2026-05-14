"use client"

import * as React from "react"
import {
  Book,
  Church,
  CircleQuestionMark,
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
import { LogoutButton } from "./logout-button"

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
              <a href="#" className="flex flex-col items-center justify-center gap-2 py-4 h-auto">
                <div className="flex aspect-square size-13 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <User className="w-full" />
                </div>
                <span className="font-medium text-base">Juan Dela Cruz</span>
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
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  )
}
