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
import { topPagesData } from "@/lib/data";

export function TopPages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Top Landing Pages</CardTitle>
        <CardDescription>
          Pages driving the most traffic and conversions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Path</TableHead>
                <TableHead className="text-right">Sessions</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPagesData.map((page) => (
                <TableRow key={page.path}>
                  <TableCell className="font-medium truncate max-w-48 md:max-w-xs">{page.path}</TableCell>
                  <TableCell className="text-right">{page.sessions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{page.conversionRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
