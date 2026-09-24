import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: September 23, 2026
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              This website is an independent informational resource. We are committed
              to protecting your privacy and being transparent about what data we
              collect and how we use it.
            </p>

            <h2>Information We Collect</h2>

            <h3>Information You Provide</h3>
            <p>We do not require user accounts for public access to this website.</p>
            <p>
              <strong>Admin users only:</strong> If you are an administrator, you
              provide:
            </p>
            <ul>
              <li>Email address</li>
              <li>Name</li>
              <li>Password (stored as a secure hash)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>Like most websites, we automatically collect:</p>
            <ul>
              <li>
                <strong>Log data:</strong> IP address, browser type, pages visited,
                time spent on pages
              </li>
              <li>
                <strong>Cookies:</strong> Session cookies for admin authentication
                only
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>
                <strong>Admin authentication:</strong> To verify identity and manage
                access to the admin dashboard
              </li>
              <li>
                <strong>Website analytics:</strong> To understand how visitors use
                the website and improve user experience
              </li>
              <li>
                <strong>Security:</strong> To detect and prevent abuse, spam, or
                security threats
              </li>
            </ul>

            <h2>What We Do NOT Do</h2>
            <ul>
              <li>We do not sell your personal information</li>
              <li>We do not share your data with third-party advertisers</li>
              <li>We do not track you across other websites</li>
              <li>
                We do not collect sensitive personal information from visitors
              </li>
              <li>We do not require registration for public content access</li>
            </ul>

            <h2>Cookies</h2>
            <p>This website uses cookies for:</p>
            <ul>
              <li>
                <strong>Authentication:</strong> To keep admin users logged in
                (session cookies)
              </li>
              <li>
                <strong>Theme preference:</strong> To remember your dark/light mode
                choice (stored locally in your browser)
              </li>
            </ul>
            <p>
              You can disable cookies in your browser settings, but this may affect
              functionality for admin users.
            </p>

            <h2>Data Storage and Security</h2>
            <ul>
              <li>
                <strong>Database:</strong> Stored on secure PostgreSQL servers
              </li>
              <li>
                <strong>Passwords:</strong> Hashed using bcrypt (never stored in
                plain text)
              </li>
              <li>
                <strong>HTTPS:</strong> All connections are encrypted with SSL/TLS
              </li>
              <li>
                <strong>Access control:</strong> Admin dashboard requires
                authentication
              </li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>This website may use:</p>
            <ul>
              <li>
                <strong>Vercel:</strong> For hosting (see{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Database provider:</strong> For PostgreSQL hosting
              </li>
            </ul>
            <p>
              These services have their own privacy policies and data handling
              practices.
            </p>

            <h2>Data Retention</h2>
            <ul>
              <li>
                <strong>Public content:</strong> Retained indefinitely for archival
                and informational purposes
              </li>
              <li>
                <strong>Admin accounts:</strong> Retained while account is active
              </li>
              <li>
                <strong>Logs:</strong> Retained for security and debugging purposes
                (typically 30-90 days)
              </li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request information about data we have collected about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your admin account</li>
              <li>Object to data processing</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              This website is not directed at children under 13. We do not knowingly
              collect personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be
              posted on this page with an updated "Last updated" date.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy-related questions or requests, please contact us through
              the repository or project contact information.
            </p>

            <h2>Disclaimer</h2>
            <p className="bg-muted p-4 rounded-lg">
              This website is an independent informational project. We are not
              affiliated with the Office of the Vice President, the International
              Criminal Court, the Philippine government, or any political campaign.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}