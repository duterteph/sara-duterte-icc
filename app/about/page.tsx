import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">About This Project</h1>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Purpose</h2>
            <p>
              This project is an independent informational resource designed to help
              readers understand publicly available information concerning Sara
              Duterte, the International Criminal Court, and related Philippine legal
              and political developments.
            </p>

            <h2>What This Project Is</h2>
            <ul>
              <li>An independent documentary and information platform</li>
              <li>A source directory and timeline of verified events</li>
              <li>A collection of primary source documents and official statements</li>
              <li>A fact-checking resource for claims in public discourse</li>
            </ul>

            <h2>What This Project Is Not</h2>
            <ul>
              <li>Not a political campaign website</li>
              <li>Not affiliated with any government or political organization</li>
              <li>Not designed to persuade visitors to support or oppose any political actor</li>
              <li>Not presenting allegations as established facts</li>
            </ul>

            <h2>Editorial Principles</h2>
            <h3>Neutrality</h3>
            <p>
              This website does not persuade visitors to support or oppose Sara
              Duterte, endorse or attack any political party or candidate, tell
              visitors how to vote, or present disputed allegations as established
              facts.
            </p>

            <h3>Attribution</h3>
            <p>
              Whenever a claim comes from a person, organization, government, court,
              journalist, or other source, it is clearly attributed. We do not turn
              attributed allegations into statements of fact.
            </p>

            <h3>Legal Accuracy</h3>
            <p>
              We use legal terminology accurately and clearly distinguish between:
              allegation, investigation, inquiry, warrant, arrest, charge, hearing,
              trial, judgment, conviction, and acquittal.
            </p>

            <h3>Source Priority</h3>
            <p>We prioritize sources in this order:</p>
            <ol>
              <li>Primary sources</li>
              <li>Official documents</li>
              <li>Court/ICC records</li>
              <li>Government documents</li>
              <li>Established journalism</li>
              <li>Academic and legal publications</li>
            </ol>

            <h2>Disclaimer</h2>
            <p className="bg-muted p-4 rounded-lg">
              <strong>Important:</strong> This is an independent informational
              project. This website is not affiliated with the Office of the Vice
              President, the International Criminal Court, the Philippine government,
              or any political campaign.
            </p>

            <h2>Contact</h2>
            <p>
              For corrections, source submissions, or inquiries, please use the
              contact information provided in the repository.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}