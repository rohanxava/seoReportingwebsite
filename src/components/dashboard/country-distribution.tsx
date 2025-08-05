
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
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";

const countryDistributionData = [
    { country: "Worldwide", share: 100, traffic: "3.6K", keywords: "1K" },
    { country: "🇺🇸 US", share: 58, traffic: "2.1K", keywords: "689" },
    { country: "🇮🇳 IN", share: 12, traffic: "429", keywords: "23" },
    { country: "🇦🇺 AU", share: 1, traffic: "1", keywords: "16" },
    { country: "Other", share: 30, traffic: "1.1K", keywords: "318" },
];


export function CountryDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Distribution by Country</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Countries</TableHead>
              <TableHead>Traffic Share</TableHead>
              <TableHead className="text-right">Traffic</TableHead>
              <TableHead className="text-right">Keywords</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countryDistributionData.map((item) => (
              <TableRow key={item.country}>
                <TableCell className="font-medium">{item.country}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={item.share} className="h-2" />
                        <span>{item.share}%</span>
                    </div>
                </TableCell>
                <TableCell className="text-right">{item.traffic}</TableCell>
                <TableCell className="text-right">{item.keywords}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-4 w-full">Compare</Button>
      </CardContent>
    </Card>
  );
}
