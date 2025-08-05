
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { KeywordsByIntentDataPoint } from "@/lib/types";

interface KeywordsByIntentProps {
    data: KeywordsByIntentDataPoint[];
}

export function KeywordsByIntent({ data }: KeywordsByIntentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Keywords by Intent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-2 w-full rounded-full overflow-hidden">
          {data.map((item) => (
            <div
              key={item.intent}
              className={item.color}
              style={{ width: `${item.percentage}%` }}
              title={`${item.intent}: ${item.percentage}%`}
            />
          ))}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Intent</TableHead>
              <TableHead>Keywords</TableHead>
              <TableHead className="text-right">Traffic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.intent}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                    />
                    <span>{item.intent}</span>
                    <span className="text-muted-foreground text-xs">{item.percentage}%</span>
                  </div>
                </TableCell>
                <TableCell>{item.keywords}</TableCell>
                <TableCell className="text-right">{item.traffic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View details</Button>
      </CardFooter>
    </Card>
  );
}
