"use client";
import React, { useState } from "react";
import MetricsPreferences from "../../components/metricsPreferences";
import PersonalInfo from "../../components/personalInfo";
import { Alert, Button, Card, Tabs } from "flowbite-react";
import EmailSettings from "../../components/emailSettings";
import PasswordSettings from "../../components/passwordSettings";

import styles from "./successView.module.scss";
import { useAuth } from "@/src/app/context/authContext";
import { User, sendEmailVerification } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import SocialAccounts from "../../components/socialAccounts";
import LinkEmailPassword from "../../components/linkEmailPassword";
import DeleteAccount from "../../components/deleteAccount";
import useAppSelector from "@/src/app/hooks/useAppSelector";

const checkIfneedsEmailVerification = (authUser: User) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider) => provider.providerId)
    .includes("password");

export default function SuccessView() {
  const { user } = useAuth();
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);
  const [errorEmailSent, setErrorEmailtSent] = useState("");
  const { created } = useAppSelector((store) => store.userProfile.data);

  const [activeTab, setActiveTab] = useState(0);

  const handleSendEmailVerification = async () => {
    sendEmailVerification(auth.currentUser as User)
      .then(() => {
        setConfirmEmailSent(true);
      })
      .catch((error) => {
        setErrorEmailtSent(error.message);
      });
  };

  const needsEmailVerification = checkIfneedsEmailVerification(user as User);

  const TABS_ITEMS = [
    {
      icon: null,
      label: "Prefrences",
      Component: <MetricsPreferences />,
    },
    {
      icon: null,
      label: "Personal",
      Component: <PersonalInfo />,
    },
    {
      icon: null,
      label: "Account",
      Component: (
        <>
          <div>
            <Card className="bg-gray-100 w-full">
              <p>Joined on {created}</p>
            </Card>
            <div className="mt-8">
              <EmailSettings />
            </div>
            <div className="mt-8">
              <LinkEmailPassword />
            </div>
            <div className="mt-8">
              <PasswordSettings />
            </div>
            <div className="mt-8">
              <SocialAccounts />
            </div>
            <div className="mt-8">
              <DeleteAccount />
            </div>
          </div>
        </>
      ),
    },
    // {
    //   icon: null,
    //   label: "Linked Accounts",
    //   Component: <SocialAccounts />,
    // },
  ];

  return (
    <div className="max-w-lg">
      <Tabs style="underline" className={styles.tabs}>
        {TABS_ITEMS.map(({ label, Component }, index) => (
          <Tabs.Item
            active={index === activeTab}
            title={label}
            key={label}
            onClick={() => setActiveTab(index)}
          >
            {Component}
          </Tabs.Item>
        ))}
      </Tabs>

      {needsEmailVerification && !user?.emailVerified && !confirmEmailSent ? (
        <Alert color="info" className="mt-5">
          <span className="block font-medium text-lg mb-1">
            Verify Your E-Mail!
          </span>{" "}
          <p>
            {" "}
            Please verify your email. Check your E-Mails (Spam folder included)
            for a confirmation E-Mail. Refresh this page once you confirmed your
            E-Mail.
          </p>
          <Button className="mt-3" onClick={handleSendEmailVerification}>
            Send confirmation E-mail
          </Button>
        </Alert>
      ) : null}
      {needsEmailVerification && !user?.emailVerified && confirmEmailSent ? (
        <Alert color="info" className="mt-5">
          <span className="block font-medium text-lg mb-1">
            E-Mail Confirmation Sent!
          </span>
          <p>
            Check your E-Mails (Spam folder included) for a confirmation E-Mail.
            Refresh this page once you confirmed your E-Mail.
          </p>
        </Alert>
      ) : null}

      {needsEmailVerification && !user?.emailVerified && errorEmailSent ? (
        <Alert color="failure" className="mt-5">
          <span className="block font-medium text-lg mb-1">
            We couldn&apos;t send you a confrimation e-mail
          </span>
          <p>{errorEmailSent || "Please try again later."}</p>
        </Alert>
      ) : null}
    </div>
  );
}
