import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const siteAuditData = {
  score: 88,
  coreWebVitals: { lcp: 2.1, fid: 25, cls: 0.08 },
  errors: 5,
  warnings: 12,
};

const ProgressCircle = ({ score }: { score: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-28 w-28 md:h-32 md:w-32 transform -rotate-90" >
        <circle
          className="text-muted"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
        />
        <circle
          className="text-primary"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
        />
      </svg>
      <span className="absolute text-2xl md:text-3xl font-bold font-headline">{score}</span>
    </div>
  );
};


export function SiteAudit() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Site Audit Score</CardTitle>
        <CardDescription>Overall health and performance</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <ProgressCircle score={siteAuditData.score} />
        <div className="grid w-full grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-lg font-bold">{siteAuditData.errors}</p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-lg font-bold">{siteAuditData.warnings}</p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">CLS</p>
                <p className="text-lg font-bold">{siteAuditData.coreWebVitals.cls}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
