import { type NextPage } from "next";
import Link from "next/link";
import {
  FileText,
  Clock,
  Shield,
  Building2,
  Gavel,
  BookOpen,
  Search,
  ArrowRight,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Demo data - replace with database queries
const demoTimelineEvents = [
  {
    date: "2024-03-15",
    title: "ICC Investigation Announcement",
    description:
      "The International Criminal Court announced the opening of an investigation into the Philippines.",
    category: "ICC",
  },
  {
    date: "2023-11-14",
    title: "Philippines Withdrawal from ICC",
    description:
      "The Philippines formally withdrew from the Rome Statute, taking effect in March 2019.",
    category: "Philippines & ICC",
  },
  {
    date: "2022-06-30",
    title: "Sara Duterte Sworn In",
    description:
      "Sara Duterte assumed office as the 15th Vice President of the Philippines.",
    category: "Sara Duterte",
  },
];

const demoUpdates = [
  {
    id: "1",
    title:
      "ICC Prosecutor Requests Authorization to Open Investigation",
    source: "ICC Official",
    date: "2024-03-15",
    category: "ICC",
  },
  {
    id: "2",
    title:
      "Philippine Government Responds to ICC Investigation",
    source: "Philippine News Agency",
    date: "2024-03-20",
    category: "Philippines & ICC",
  },
];

const navigationCards = [
  {
    title: "Sara Duterte",
    description:
      "Biography, public offices, official statements, and relevant public record.",
    href: "/sara-duterte",
    icon: UserIcon,
  },
  {
    title: "The ICC Explained",
    description:
      "Understanding the International Criminal Court, its jurisdiction, and processes.",
    href: "/icc-explained",
    icon: Shield,
  },
  {
    title: "Philippines & ICC",
    description:
      "Historical relationship, treaty membership, and legal context.",
    href: "/philippines-and-icc",
    icon: Globe,
  },
  {
    title: "Legal Context",
    description:
      "ICC jurisdiction, complementarity, admissibility, and individual responsibility.",
    href: "/legal-context",
    icon: Gavel,
  },
  {
    title: "Timeline",
    description:
      "Chronological record of key events related to the investigation.",
    href: "/timeline",
    icon: Clock,
  },
  {
    title: "Documents",
    description:
      "Primary source documents from ICC, Philippine government, and other official bodies.",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Claims & Fact-Check",
    description:
      "Verification status of claims and statements in public discourse.",
    href: "/claims",
    icon: BookOpen,
  },
  {
    title: "Sources",
    description:
      "Directory of primary and secondary sources used in this project.",
    href: "/sources",
    icon: Search,
  },
];

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const HomePage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 border-b bg-background">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Understanding Sara Duterte & the ICC
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Facts, timelines, documents, and legal context — presented with
              sources.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/timeline">
                  <Clock className="mr-2 h-4 w-4" />
                  Explore Timeline
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/icc-explained">
                  <Shield className="mr-2 h-4 w-4" />
                  Understand the ICC
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/updates">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Latest Updates
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground pt-4">
              Last updated: September 23, 2026
            </p>
          </div>
        </section>

        {/* Information Cards */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    Sara Duterte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vice President of the Philippines. Learn about her public
                    offices, statements, and relevant record.
                  </p>
                  <Button asChild variant="link" className="px-0">
                    <Link href="/sara-duterte">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    The ICC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    The International Criminal Court. Understand its mandate,
                    jurisdiction, and processes.
                  </p>
                  <Button asChild variant="link" className="px-0">
                    <Link href="/icc-explained">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Philippines & ICC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Historical relationship between the Philippines and the
                    International Criminal Court.
                  </p>
                  <Button asChild variant="link" className="px-0">
                    <Link href="/philippines-and-icc">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Latest Developments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Latest verified news and developments related to the ICC
                    investigation.
                  </p>
                  <Button asChild variant="link" className="px-0">
                    <Link href="/updates">
                      View updates <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline Preview */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                Timeline Preview
              </h2>
              <Button asChild variant="outline">
                <Link href="/timeline">
                  View Full Timeline <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {demoTimelineEvents.map((event, index) => (
                <Card key={index}>
                  <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-shrink-0">
                        <Badge variant="outline" className="whitespace-nowrap">
                          {event.date}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Grid */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Explore the Topics
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {navigationCards.map((card) => (
                <Card
                  key={card.href}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <CardHeader>
                    <card.icon className="h-6 w-6 mb-2 text-primary" />
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {card.description}
                    </p>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={card.href}>
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                Latest Updates
              </h2>
              <Button asChild variant="outline">
                <Link href="/updates">
                  All Updates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4">
              {demoUpdates.map((update) => (
                <Card key={update.id}>
                  <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-2">{update.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{update.source}</span>
                          <span>•</span>
                          <span>{update.date}</span>
                          <Badge variant="secondary" className="ml-2">
                            {update.category}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Original Source
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 px-4 md:px-6 bg-muted/30 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This is an independent informational
              project. This website is not affiliated with the Office of the
              Vice President, the International Criminal Court, the Philippine
              government, or any political campaign. All content is presented
              with attribution and sources for verification.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;