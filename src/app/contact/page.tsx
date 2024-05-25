import React from "react";
import Header from "../common/components/header";
import Footer from "../common/footer";

export default async function ContactPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="grow">
        <section>
          <div className="container flex flex-col items-center justify-center gap-8 py-12 md:py-20 max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-medium">Get in touch</h1>
            <p>
              We&apos;d love to hear from you! Send us a message using the
              contact details here and we&apos;ll get back to you as soon as
              possible.
            </p>
            <div className="w-full">
              <p className="font-medium mb-1 text-lg">Support</p>
              <a
                href="mailto:support@fittrackmate.com"
                className="hover:underline"
              >
                {" "}
                support@fittrackmate.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
