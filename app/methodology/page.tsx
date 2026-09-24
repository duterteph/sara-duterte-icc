import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Methodology</h1>
            <p className="text-lg text-muted-foreground">
              How we gather, verify, and present information
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Information Gathering</h2>
            <ol>
              <li>
                <strong>Primary sources are prioritized.</strong> We prioritize
                official ICC documents, government documents, court records, and
                direct statements over secondary reporting.
              </li>
              <li>
                <strong>Automated monitoring with human review.</strong> Our system
                monitors news sources and official channels using n8n automation, but
                every article requires human review before publication.
              </li>
              <li>
                <strong>Multiple source verification.</strong> When possible, we
                verify information across multiple independent sources before
                presenting it as confirmed.
              </li>
            </ol>

            <h2>Attribution</h2>
            <p>Every claim on this website is attributed to its source:</p>
            <ul>
              <li>
                <strong>Direct quotes</strong> are clearly marked and attributed to
                the speaker
              </li>
              <li>
                <strong>Official statements</strong> include the organization and
                date
              </li>
              <li>
                <strong>News reports</strong> cite the publication and reporter where
                available
              </li>
              <li>
                <strong>Allegations</strong> are presented as allegations, not facts,
                with clear attribution
              </li>
            </ul>

            <h2>Verification Process</h2>
            <p>Articles and events go through multiple verification stages:</p>
            <ol>
              <li>
                <strong>Source validation:</strong> Is the source credible and
                verifiable?
              </li>
              <li>
                <strong>Date verification:</strong> Can we confirm when this
                information was published or stated?
              </li>
              <li>
                <strong>Attribution check:</strong> Is it clear who made this claim
                or statement?
              </li>
              <li>
                <strong>Context review:</strong> Is important context included to
                prevent misunderstanding?
              </li>
              <li>
                <strong>Legal terminology review:</strong> Is legal language used
                correctly?
              </li>
            </ol>

            <h2>Timeline Construction</h2>
            <p>Timeline events must meet these criteria:</p>
            <ul>
              <li>Verifiable date</li>
              <li>Primary or credible secondary source</li>
              <li>Clear attribution</li>
              <li>Relevant to the subject matter</li>
              <li>No editorial speculation about motives or future outcomes</li>
            </ul>

            <h2>Document Archive</h2>
            <p>Documents in our archive:</p>
            <ul>
              <li>Are linked to their original source when publicly available</li>
              <li>Include publication date and issuing organization</li>
              <li>Are categorized by document type and source</li>
              <li>Are never altered or edited from their original form</li>
            </ul>

            <h2>Claims and Fact-Checking</h2>
            <p>Our fact-checking process:</p>
            <ol>
              <li>
                <strong>Identify the claim:</strong> What exactly is being asserted?
              </li>
              <li>
                <strong>Find the source:</strong> Who made this claim and when?
              </li>
              <li>
                <strong>Gather evidence:</strong> What documentation or records exist?
              </li>
              <li>
                <strong>Distinguish facts from allegations:</strong> What is
                confirmed? What is disputed? What is uncertain?
              </li>
              <li>
                <strong>Present findings:</strong> Share what we found with clear
                attribution
              </li>
            </ol>

            <p>We use these status labels:</p>
            <ul>
              <li>
                <strong>Verified fact:</strong> Confirmed by primary sources or
                multiple credible sources
              </li>
              <li>
                <strong>Official statement:</strong> Documented public statement by an
                official or organization
              </li>
              <li>
                <strong>Allegation:</strong> Claimed but not independently verified
              </li>
              <li>
                <strong>Disputed claim:</strong> Conflicting accounts from credible
                sources
              </li>
              <li>
                <strong>Context needed:</strong> Requires additional context to
                understand fully
              </li>
              <li>
                <strong>Not independently verified:</strong> We cannot confirm this
                claim
              </li>
            </ul>

            <h2>News Review Process</h2>
            <p>Before any news article is published:</p>
            <ol>
              <li>Automated system discovers article from monitored sources</li>
              <li>AI summarizes article while preserving attribution</li>
              <li>Article is marked as PENDING</li>
              <li>Human editor reviews for accuracy, neutrality, and attribution</li>
              <li>Editor approves, rejects, or requests changes</li>
              <li>Only approved articles are published to the website</li>
            </ol>

            <h2>Transparency</h2>
            <ul>
              <li>
                We link to original sources whenever possible so readers can verify
                information themselves
              </li>
              <li>
                We clearly mark when information cannot be independently verified
              </li>
              <li>We distinguish between confirmed facts and allegations</li>
              <li>We preserve edit history for political content</li>
              <li>
                We acknowledge that information may change as legal proceedings
                develop
              </li>
            </ul>

            <h2>Limitations</h2>
            <p>This website:</p>
            <ul>
              <li>Cannot provide real-time updates</li>
              <li>
                Relies on publicly available information (not insider access)
              </li>
              <li>
                Cannot independently verify every claim made in public discourse
              </li>
              <li>Does not provide legal advice or legal analysis</li>
              <li>Cannot guarantee completeness of coverage</li>
            </ul>

            <h2>Corrections</h2>
            <p>
              If you find an error, please report it through our contact channels. We
              will investigate and correct verified errors promptly, with a
              transparent record of the correction.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}