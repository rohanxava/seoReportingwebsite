
import {
  Card,
  CardContent,
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
import type { CountryDistributionDataPoint } from "@/lib/types";

interface CountryDistributionProps {
    data: CountryDistributionDataPoint[];
}

export function CountryDistribution({ data }: CountryDistributionProps) {
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
            {data.map((item) => (
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
