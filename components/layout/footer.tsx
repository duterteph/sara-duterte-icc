import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">About This Project</h3>
            <p className="text-xs text-muted-foreground">
              An independent informational resource designed to help readers
              understand publicly available information concerning Sara Duterte,
              the International Criminal Court, and related Philippine legal and
              political developments.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/timeline"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/icc-explained"
                  className="text-muted-foreground hover:text-foreground"
                >
                  ICC Explained
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documents
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Information</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/methodology"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            <strong>Disclaimer:</strong> This is an independent informational
            project. Not affiliated with the Office of the Vice President, the
            International Criminal Court, the Philippine government, or any
            political campaign.
          </p>
        </div>
      </div>
    </footer>
  );
}