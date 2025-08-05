import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

const keywordRankingsData = [
  { keyword: "AI-powered CRM", position: 3, change: 1, trend: [5, 4, 3, 3] },
  { keyword: "Cloud solutions for startups", position: 5, change: -1, trend: [3, 4, 4, 5] },
  { keyword: "Data analytics tools", position: 8, change: 0, trend: [8, 8, 8, 8] },
  { keyword: "Best project management software", position: 12, change: 3, trend: [18, 15, 15, 12] },
  { keyword: "Enterprise SaaS platform", position: 15, change: -2, trend: [11, 12, 13, 15] },
];

export function KeywordRankings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Keyword Rankings</CardTitle>
        <CardDescription>Top 5 keyword performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead className="text-center">Position</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywordRankingsData.map((item) => (
              <TableRow key={item.keyword}>
                <TableCell className="font-medium">{item.keyword}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{item.position}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "flex items-center justify-end gap-1 text-sm",
                      item.change > 0 && "text-green-600",
                      item.change < 0 && "text-red-600"
                    )}
                  >
                    {item.change > 0 && <ArrowUp className="h-3 w-3" />}
                    {item.change < 0 && <ArrowDown className="h-3 w-3" />}
                    {item.change === 0 && <Minus className="h-3 w-3 text-muted-foreground" />}
                    {Math.abs(item.change)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
