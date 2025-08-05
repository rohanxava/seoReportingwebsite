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

const topPagesData = [
  { path: "/features/ai-crm", sessions: 2890, conversionRate: "5.2%" },
  { path: "/blog/future-of-cloud", sessions: 1980, conversionRate: "3.1%" },
  { path: "/pricing", sessions: 1520, conversionRate: "8.5%" },
  { path: "/case-studies/quantum-leap", sessions: 980, conversionRate: "2.5%" },
  { path: "/integrations", sessions: 750, conversionRate: "1.8%" },
];


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
