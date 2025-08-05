import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Link2Off, ShieldAlert } from "lucide-react";

const backlinksData = {
  new: 24,
  lost: 8,
  toxic: 3,
};

export function BacklinksOverview() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline">Backlinks Overview</CardTitle>
            <CardDescription>Summary of backlink profile changes</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Backlinks</CardTitle>
                    <Link className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{backlinksData.new}</div>
                    <p className="text-xs text-muted-foreground">in the last 30 days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lost Backlinks</CardTitle>
                    <Link2Off className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{backlinksData.lost}</div>
                    <p className="text-xs text-muted-foreground">in the last 30 days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toxic Links</CardTitle>
                    <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">{backlinksData.toxic}</div>
                    <p className="text-xs text-muted-foreground">potential risks detected</p>
                </CardContent>
            </Card>
        </CardContent>
    </Card>
  );
}
