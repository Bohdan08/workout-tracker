import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import React from "react";

export default function FooterComponent() {
  return (
    <Footer container className="bg-transparent shadow-none">
      <div className="w-full text-center">
        <div
          // className="w-full justify-between sm:flex sm:items-center sm:justify-between"
          className="w-full flex justify-center items-center"
        >
          {/* <FooterBrand
            href="https://flowbite.com"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Flowbite"
          /> */}
          <FooterLinkGroup>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright
          href="#"
          by="Workout Tracker"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}
