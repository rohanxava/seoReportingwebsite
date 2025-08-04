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
import { competitorData } from "@/lib/data";

export function CompetitorAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Competitor Analysis</CardTitle>
        <CardDescription>
          Your ranking compared to competitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Competitor</TableHead>
              <TableHead className="text-right">Avg. Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-muted/50">
              <TableCell className="font-medium">You (Innovate.com)</TableCell>
              <TableCell className="text-right">
                <Badge>#8</Badge>
              </TableCell>
            </TableRow>
            {competitorData.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">#{item.avgRanking}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
