import { type NextPage } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Demo data - replace with database queries
const demoEvents = [
  {
    id: "1",
    date: "2024-03-15",
    title: "ICC Prosecutor Requests Authorization to Open Investigation",
    description:
      "ICC Prosecutor Karim Khan requested authorization from the Pre-Trial Chamber to open an investigation into the situation in the Philippines.",
    category: "ICC",
    sources: ["ICC Official", "Reuters"],
  },
  {
    id: "2",
    date: "2024-01-19",
    title: "Philippines Files Notice of Withdrawal from Rome Statute",
    description:
      "The Philippines submitted its notice of withdrawal from the Rome Statute to the United Nations Secretary-General.",
    category: "Philippines & ICC",
    sources: ["UN Treaty Collection"],
  },
  {
    id: "3",
    date: "2023-11-14",
    title: "Withdrawal Takes Effect",
    description:
      "The Philippines' withdrawal from the Rome Statute took effect, one year after the notice was submitted.",
    category: "Philippines & ICC",
    sources: ["ICC Official"],
  },
  {
    id: "4",
    date: "2022-06-30",
    title: "Sara Duterte Sworn In as Vice President",
    description:
      "Sara Duterte assumed office as the 15th Vice President of the Philippines after winning the 2022 election.",
    category: "Sara Duterte",
    sources: ["Philippine News Agency"],
  },
  {
    id: "5",
    date: "2022-05-09",
    title: "Sara Duterte Elected Vice President",
    description:
      "Sara Duterte won the 2022 Philippine presidential election, receiving over 31 million votes.",
    category: "Sara Duterte",
    sources: ["COMELEC"],
  },
  {
    id: "6",
    date: "2019-03-17",
    title: "Philippines Announces Withdrawal from Rome Statute",
    description:
      "President Rodrigo Duterte announced the Philippines' withdrawal from the International Criminal Court.",
    category: "Philippines & ICC",
    sources: ["Malacañang Palace"],
  },
  {
    id: "7",
    date: "2018-02-08",
    title: "ICC Opens Preliminary Examination",
    description:
      "The ICC Prosecutor opened a preliminary examination into the situation in the Philippines.",
    category: "ICC",
    sources: ["ICC Official"],
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "ICC", label: "ICC" },
  { value: "Philippines & ICC", label: "Philippines & ICC" },
  { value: "Sara Duterte", label: "Sara Duterte" },
  { value: "Legal Proceedings", label: "Legal Proceedings" },
  { value: "Public Statements", label: "Public Statements" },
  { value: "International Developments", label: "International Developments" },
];

const TimelinePage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Timeline</h1>
            <p className="text-muted-foreground">
              Chronological record of key events related to the ICC
              investigation, the Philippines, and Sara Duterte. All events are
              attributed to their sources.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Search events..."
              className="sm:w-[300px]"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />

            <div className="space-y-8">
              {demoEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative flex flex-col md:flex-row gap-4 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Date Badge */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  {/* Card */}
                  <div className="ml-12 md:ml-0 md:w-[calc(50%-2rem)]">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="outline">{event.date}</Badge>
                          <Badge variant="secondary">{event.category}</Badge>
                        </div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {event.sources.map((source) => (
                            <Badge key={source} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This timeline presents verified events from
              primary sources. Events marked as requiring verification are
              pending additional source confirmation. This timeline does not
              present allegations as established facts.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TimelinePage;