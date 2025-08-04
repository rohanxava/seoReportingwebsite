import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: React.ReactNode;
}

export function KpiCard({ title, value, change, changeType, icon }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
            "text-xs text-muted-foreground",
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        )}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}
