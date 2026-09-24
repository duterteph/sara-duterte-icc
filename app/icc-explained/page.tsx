import { type NextPage } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IccExplainedPage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Page Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Understanding the International Criminal Court
            </h1>
            <p className="text-lg text-muted-foreground">
              A guide to the ICC, its jurisdiction, and its processes.
            </p>
          </div>

          {/* What is the ICC */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What is the ICC?</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  The International Criminal Court (ICC) is an independent
                  international organization established by the Rome Statute in
                  1998. It is the first permanent international court with
                  jurisdiction over genocide, crimes against humanity, war
                  crimes, and the crime of aggression.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The ICC is not part of the United Nations system, though it
                  cooperates with the UN. It is governed by the Assembly of
                  States Parties, which meets annually to oversee the Court&apos;s
                  work.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* ICC Jurisdiction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              What Crimes Fall Under ICC Jurisdiction?
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Badge className="flex-shrink-0">Genocide</Badge>
                    <span className="text-muted-foreground">
                      Acts committed with intent to destroy, in whole or in part,
                      a national, ethnical, racial, or religious group.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="flex-shrink-0">Crimes Against Humanity</Badge>
                    <span className="text-muted-foreground">
                      Widespread or systematic attacks directed against any
                      civilian population, such as murder, extermination,
                      torture, rape, and enforced disappearance.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="flex-shrink-0">War Crimes</Badge>
                    <span className="text-muted-foreground">
                      Serious violations of the laws and customs applicable in
                      international or non-international armed conflict.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="flex-shrink-0">Crime of Aggression</Badge>
                    <span className="text-muted-foreground">
                      The planning, preparation, initiation, or execution of an
                      act of aggression by a person in a position to exercise
                      control over the political or military action of a state.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Key Concepts */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Key Legal Concepts</h2>

            <Card>
              <CardHeader>
                <CardTitle>Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Jurisdiction refers to the Court&apos;s authority to hear a case.
                  The ICC can exercise jurisdiction when: (1) a state party
                  refers a situation, (2) the UN Security Council refers a
                  situation, or (3) the Prosecutor initiates an investigation
                  proprio motu (on their own motion) with Pre-Trial Chamber
                  authorization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Territorial & Temporal Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  The ICC can only exercise jurisdiction if the state on whose
                  territory the crime occurred, or the state of which the
                  accused is a national, is a party to the Rome Statute, or has
                  accepted the Court&apos;s jurisdiction. Temporal jurisdiction is
                  limited to crimes committed after the Rome Statute entered
                  into force for that state (July 1, 2002, or later for states
                  that joined later).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complementarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  The ICC is designed to complement national criminal
                  jurisdictions. It only steps in when national courts are
                  unwilling or unable to genuinely carry out investigations or
                  prosecutions. This principle is central to the Court&apos;s
                  structure and ensures respect for state sovereignty.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admissibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Before the ICC can proceed with a case, it must determine
                  whether the case is admissible. A case is inadmissible if: (1)
                  it is being investigated or prosecuted by a state which has
                  jurisdiction over it, (2) it has been investigated by a state
                  which has jurisdiction and the state has decided not to
                  prosecute, or (3) the accused has already been tried for the
                  conduct.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* ICC Process */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">ICC Legal Process</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-2">
                  {[
                    { label: "Allegation", desc: "Reports of crimes emerge" },
                    { label: "Preliminary Examination", desc: "Prosecutor assesses jurisdiction and gravity" },
                    { label: "Investigation", desc: "Evidence gathering phase" },
                    { label: "Arrest Warrant / Summons", desc: "Judicial authorization" },
                    { label: "Confirmation of Charges", desc: "Pre-trial hearing" },
                    { label: "Trial", desc: "Trial Chamber proceedings" },
                    { label: "Judgment", desc: "Verdict and sentence" },
                    { label: "Appeals", desc: "Review if applicable" },
                  ].map((step, index) => (
                    <div key={step.label} className="flex items-center gap-4 w-full max-w-md">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {step.desc}
                        </div>
                      </div>
                      {index < 7 && (
                        <div className="absolute left-8 md:left-1/2 w-px h-4 bg-border -mt-8 ml-3 md:ml-0" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Presumption of Innocence */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Presumption of Innocence</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  Under the Rome Statute and international human rights law,
                  everyone is presumed innocent until proven guilty according to
                  law. The burden of proof rests entirely on the Prosecutor. An
                  arrest warrant or investigation does not imply guilt - it
                  means a Pre-Trial Chamber has found reasonable grounds to
                  believe the person may have committed a crime.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Source */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Sources</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  Information on this page is derived from the International
                  Criminal Court official resources, including the Rome Statute,
                  Rules of Procedure and Evidence, and ICC publications
                  available at{" "}
                  <a
                    href="https://www.icc-cpi.int"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    icc-cpi.int
                  </a>
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IccExplainedPage;