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

const keywordsByIntentData = [
  { intent: 'Informational', percentage: 27.8, keywords: 5, traffic: 0, color: 'bg-blue-500' },
  { intent: 'Navigational', percentage: 5.6, keywords: 1, traffic: 0, color: 'bg-purple-500' },
  { intent: 'Commercial', percentage: 50, keywords: 9, traffic: 1, color: 'bg-yellow-400' },
  { intent: 'Transactional', percentage: 16.7, keywords: 3, traffic: 0, color: 'bg-teal-500' },
];

export function KeywordsByIntent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Keywords by Intent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-2 w-full rounded-full overflow-hidden">
          {keywordsByIntentData.map((item) => (
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
            {keywordsByIntentData.map((item) => (
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
