import React from "react";
import Header from "../common/components/header";
import Footer from "../common/footer";

export default async function ContactPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="grow">
        <section>
          <div className="container py-12 md:py-20 max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-medium text-center">
              Terms and Conditions
            </h1>
            <div className="mt-10">
              {/* acceptance */}
              <div>
                <strong>1.Acceptance of Terms</strong>
                <p className="mt-2">
                  By accessing and using the Workout Tracker website at
                  workouttracker.com (the &quot;Website&quot;) and any services
                  provided by Venturekit (collectively, the
                  &quot;Service&quot;), you agree to comply with and be bound by
                  these Terms of Service (the &quot;Terms&quot;). Please review
                  these Terms carefully. If you do not agree with these Terms,
                  you must not use our Service.
                </p>
              </div>
              {/* description */}
              <div className="mt-8">
                <strong>2. Description of Service</strong>
                <p className="mt-2">
                  The workout tracker offers the capability to save and monitor
                  your exercise routines.
                </p>
              </div>
              {/* data protection */}
              <div className="mt-8">
                <strong>3. Privacy and Data Protection</strong>
                <p className="mt-2">
                  Your privacy is critically important to us. We do not share
                  your data with anyone. For more detailed information on how we
                  collect and use information, please refer to our Privacy
                  Policy available on the Website.
                </p>
              </div>

              {/* responsibilities */}
              <div className="mt-8">
                <strong>4. User Conduct and Responsibilities</strong>
                <p className="mt-2">
                  You agree to use the Service in compliance with all applicable
                  local, state, national, and international laws, rules, and
                  regulations. You shall not, shall not agree to, and shall not
                  authorize or encourage any third party to:
                </p>
                <ul className="mt-2 flex flex-col gap-5 list-disc relative left-4">
                  <li>Use the Service for any illegal purpose.</li>
                  <li>
                    Attempt to decipher, decompile, delete, alter or reverse
                    engineer any of the software comprising or in any way making
                    up a part of the Service.
                  </li>
                </ul>
              </div>

              {/* disclaimers */}
              <div className="mt-8">
                <strong>5. Disclaimers</strong>
                <p className="mt-2">
                  The Service is provided &quot;as-is&quot; and &quot;as
                  available&quot;. Workout Tracker makes no warranty that the
                  Service will be uninterrupted, timely, secure, or error-free.
                </p>
              </div>

              {/* liability */}
              <div className="mt-8">
                <strong>6. Limitation of Liability</strong>
                <p className="mt-2">
                  To the fullest extent permitted by law, Workout Tracker shall
                  not be liable for any indirect, incidental, special,
                  consequential, or exemplary damages, including but not limited
                  to, damages for loss of profits, goodwill, use, data, or other
                  intangible losses, resulting from the use or the inability to
                  use the Service.
                </p>
              </div>

              {/* modifications */}
              <div className="mt-8">
                <strong>7. Modifications to Terms of Service</strong>
                <p className="mt-2">
                  Workout Tracker reserves the right to modify these Terms from
                  time to time. You should review these Terms periodically to
                  ensure familiarity with its then-current terms and conditions.
                  Your continued use of the Service shall constitute acceptance
                  of any modifications.
                </p>
              </div>

              {/* termination */}
              <div className="mt-8">
                <strong>8. Termination</strong>
                <p className="mt-2">
                  Workout Tracker reserves the right to terminate or restrict
                  your access to the Service, without notice, for conduct that
                  we believe violates these Terms or is harmful to other users,
                  us, third parties, or for any other reason.
                </p>
              </div>

              {/* governing */}
              <div className="mt-8">
                <strong>9. Governing Law and Jurisdiction</strong>
                <p className="mt-2">
                  These Terms and your use of Workout Tracker shall be governed
                  by and construed in accordance with the laws of Canada,
                  without regard to its conflict of law provisions.
                </p>
              </div>
              {/* governing */}
              <div className="mt-8">
                <strong>10. Contact Information</strong>
                <p className="mt-2">
                  For any queries regarding these Terms, please contact us via
                  the contact information provided on the Website.
                </p>
                <p className="mt-2">
                  By using Workout Tracker, you signify your acceptance of these
                  Terms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
