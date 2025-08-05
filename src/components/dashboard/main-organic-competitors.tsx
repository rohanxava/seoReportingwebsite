
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
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { mainOrganicCompetitorsData } from "@/lib/data";
import { ExternalLink, ListFilter } from "lucide-react";
import Link from "next/link";

export function MainOrganicCompetitors() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle className="font-headline">Main Organic Competitors</CardTitle>
                <CardDescription>{mainOrganicCompetitorsData.length}</CardDescription>
            </div>
             <Button variant="ghost" size="icon" className="text-muted-foreground">
                <ListFilter className="h-4 w-4" />
             </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competitor</TableHead>
                <TableHead>Com. Level</TableHead>
                <TableHead className="text-right">Com. Keywords</TableHead>
                <TableHead className="text-right">SE Keywords</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mainOrganicCompetitorsData.map((competitor) => (
                <TableRow key={competitor.competitor}>
                  <TableCell className="font-medium">
                    <Link href="#" className="flex items-center gap-2 hover:underline text-primary">
                        {competitor.competitor}
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                  </TableCell>
                  <TableCell>
                      <Slider
                        defaultValue={[competitor.comLevel]}
                        max={100}
                        step={1}
                        disabled
                        className="w-24"
                      />
                  </TableCell>
                  <TableCell className="text-right">{competitor.comKeywords}</TableCell>
                  <TableCell className="text-right">{competitor.seKeywords}</TableCell>
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
