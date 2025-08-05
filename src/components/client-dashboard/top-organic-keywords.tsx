
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote, MoreHorizontal } from "lucide-react";

const topOrganicKeywordsData = [
    { keyword: "police brand wat...", intent: ["C"], position: null, serp: true, volume: 90, cpc: 0.23, traffic: 100.00 },
    { keyword: "watch tel", intent: ["C"], position: 64, serp: false, volume: 320, cpc: 0.57, traffic: 0.00 },
    { keyword: "police wtch", intent: ["C"], position: null, serp: true, volume: 50, cpc: 0.22, traffic: 0.00 },
    { keyword: "mens infinity bra...", intent: ["I", "T"], position: 37, serp: false, volume: 70, cpc: 0.92, traffic: 0.00 },
    { keyword: "father and son o...", intent: ["I"], position: 36, serp: false, volume: 50, cpc: 0.00, traffic: 0.00 },
];

export function TopOrganicKeywords() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline">Top Organic Keywords</CardTitle>
            <Badge variant="outline">{topOrganicKeywordsData.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Pos.</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>CPC (USD)</TableHead>
                <TableHead className="text-right">Traffic (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topOrganicKeywordsData.map((keyword) => (
                <TableRow key={keyword.keyword}>
                  <TableCell className="font-medium whitespace-nowrap">{keyword.keyword}</TableCell>
                  <TableCell>
                      <div className="flex gap-1">
                          {keyword.intent.map(i => (
                              <Badge key={i} variant="secondary" className="w-6 h-6 flex items-center justify-center">{i}</Badge>
                          ))}
                      </div>
                  </TableCell>
                  <TableCell>
                    {keyword.serp ? <MessageSquareQuote className="h-4 w-4 text-primary" /> : keyword.position}
                  </TableCell>
                  <TableCell>{keyword.volume}</TableCell>
                  <TableCell>{keyword.cpc}</TableCell>
                  <TableCell className="text-right">{keyword.traffic.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="pt-6">
        <Button className="w-full">View details</Button>
      </CardFooter>
    </Card>
  );
}
