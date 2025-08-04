import Link from "next/link";
import { Activity, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-semibold">
              SEO Clarity
            </span>
        </div>
         <div className="flex-1 text-center md:text-left">
           <p className="text-sm text-muted-foreground truncate">Client Portal for Innovate Inc.</p>
         </div>
         <Button asChild variant="outline" size="sm">
            <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Sign Out</span>
            </Link>
         </Button>
      </header>
      <main>{children}</main>
    </div>
  );
}
