"use client"

import * as React from "react"
import {
  Book,
  Mail,
  Settings,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { ROUTES } from "@/lib/routes"
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
  navMain: [
    {
      title: "Profile",
      url: ROUTES.profile,
      icon: User,
      isActive: true,
    },
    {
      title: "Settings",
      url: ROUTES.settings,
      icon: Settings,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Library",
      url: ROUTES.library,
      icon: Book,
      isActive: true,
    },
    {
      title: "Notifications",
      url: ROUTES.notifications,
      icon: Mail,
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
              <a href={ROUTES.account} className="flex flex-col items-center justify-center gap-2 py-4 h-auto">
                <div className="flex aspect-square size-13 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <User className="w-full" />
                </div>
                <span className="font-medium text-base">My Profile</span>
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
