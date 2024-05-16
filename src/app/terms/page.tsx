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
              {/* intro */}
              <div>
                <strong>1.Introduction</strong>
                <p className="mt-2">
                  Welcome to Privacy Policy Page. We respect your privacy and
                  are committed to protecting your personal data. This Privacy
                  Policy will inform you about how we look after your personal
                  data when you visit our website (workout-tracker.com) or use
                  our services and tell you about your privacy rights and how
                  the law protects you.
                </p>
              </div>
              {/* data we collect */}
              <div className="mt-8">
                <strong>2. Data We Collect</strong>
                <p className="mt-2">
                  We may collect, use, store, and transfer different kinds of
                  personal data about you as follows:
                </p>
                <ul className="mt-2 flex flex-col gap-5 list-disc relative left-4">
                  <li>
                    <p>
                      <strong>Identity Data</strong>: Includes first name, last
                      name, username, or similar identifier.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Inputted Data</strong>: Includes data you enter on
                      our website, like your workout details.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Contact Data</strong>: Includes email address.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Usage Data</strong>: Includes information about
                      how you use our website and services.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Technical Data</strong>: Includes IP address, your
                      login data, browser type and version, time zone setting
                      and location, browser plug-in types and versions,
                      operating system and platform, and other technology on the
                      devices you use to access this website.
                    </p>
                  </li>
                </ul>
              </div>
              {/* retention */}
              <div className="mt-8">
                <strong>3. Data Retention</strong>
                <p className="mt-2">
                  We will only retain your personal data for as long as
                  necessary to fulfill the purposes we collected it for,
                  including for the purposes of satisfying any legal,
                  accounting, or reporting requirements.
                </p>
              </div>

              {/* sharing */}
              <div className="mt-8">
                <strong>4. Sharing Your Data</strong>
                <p className="mt-2">
                  We want to reassure our users:
                  <strong> We do not share your data with anyone.</strong> The
                  only exceptions would be to comply with a legal obligation or
                  to protect our rights, privacy, safety, or property, and/or
                  that of our affiliates, you, or others, and to prevent fraud
                  and other prohibited or illegal activities.
                </p>
              </div>

              {/* rights */}
              <div className="mt-8">
                <strong>5. Your Rights</strong>
                <p className="mt-2">You have the right to:</p>
                <ul className="mt-2 flex flex-col gap-5 list-disc relative left-4">
                  <li>Request access to your personal data.</li>
                  <li>
                    Request correction of the personal data we hold about you.
                  </li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request the transfer of your personal data.</li>
                  <li>Withdraw consent.</li>
                </ul>
              </div>

              {/* security */}
              <div className="mt-8">
                <strong>6. Security</strong>
                <p className="mt-2">
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used, or
                  accessed in an unauthorized way. In addition, we limit access
                  to your personal data to those employees and other third
                  parties who have a business need to know.
                </p>
              </div>

              {/* third party */}
              <div className="mt-8">
                <strong>7. Third-party Links</strong>
                <p className="mt-2">
                  Our website Privacy Policy does not apply to other advertisers
                  or websites. Thus, we are advising you to consult the
                  respective Privacy Policies of these third-party services
                  providers for more detailed information. It may include their
                  practices and instructions on how to opt-out of certain
                  options.
                </p>
              </div>

              {/* changes */}
              <div className="mt-8">
                <strong>8. Changes to This Privacy Policy</strong>
                <p className="mt-2">
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date.
                </p>
              </div>

              {/* contact */}
              <div className="mt-8">
                <strong>9. Contact Us</strong>
                <p className="mt-2">
                  If you have any questions, comments, or concerns about this
                  Privacy Policy or our privacy practices, please contact us
                  through the contact information provided on our website.
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
