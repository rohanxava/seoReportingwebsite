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
         <p className="text-sm text-muted-foreground">Client Portal for Innovate Inc.</p>
         <Button asChild variant="outline">
            <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Link>
         </Button>
      </header>
      <main>{children}</main>
    </div>
  );
}
