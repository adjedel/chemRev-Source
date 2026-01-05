'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { topics } from '@/lib/topics';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Atom, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Topic } from '@/lib/topics';

const topicCategories = topics.reduce((acc, topic) => {
  if (!acc[topic.category]) {
    acc[topic.category] = [];
  }
  acc[topic.category].push(topic);
  return acc;
}, {} as Record<string, Topic[]>);

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Atom className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tight text-sidebar-foreground">
              ChemRev
            </h2>
            <p className="text-sm text-sidebar-foreground/70">Online</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard'}
              tooltip="Dashboard"
            >
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {Object.entries(topicCategories).map(([category, topicsInCategory]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>
            <SidebarMenu>
              {topicsInCategory.map((topic) => (
                <SidebarMenuItem key={topic.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/dashboard/topics/${topic.slug}`}
                    tooltip={topic.title}
                  >
                    <Link href={`/dashboard/topics/${topic.slug}`}>
                      <topic.icon className="h-4 w-4" />
                      <span>{topic.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/10 p-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="@student" data-ai-hint="profile picture" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className={cn('flex flex-col transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0')}>
            <p className="text-sm font-medium text-sidebar-foreground">
              Student User
            </p>
            <p className="text-xs text-sidebar-foreground/70">
              student@example.com
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
