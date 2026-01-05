import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

type Breadcrumb = {
  name: string;
  href: string;
};

type HeaderProps = {
  title: string;
  breadcrumbs: Breadcrumb[];
  action?: React.ReactNode;
};

export default function Header({ title, breadcrumbs, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.name} className="flex items-center gap-2">
              <Button variant="link" asChild className="p-0 text-muted-foreground">
                <Link href={crumb.href}>{crumb.name}</Link>
              </Button>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </nav>
        <h1 className="ml-2 text-lg font-semibold md:hidden">{title}</h1>
      </div>
      {action && <div className="ml-auto">{action}</div>}
    </header>
  );
}
