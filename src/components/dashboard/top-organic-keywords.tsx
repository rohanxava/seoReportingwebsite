
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
import { topOrganicKeywordsData } from "@/lib/data";
import { MessageSquareQuote, MoreHorizontal } from "lucide-react";
import Link from "next/link";

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
        <Button asChild className="w-full">
            <Link href="/dashboard/projects">View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
