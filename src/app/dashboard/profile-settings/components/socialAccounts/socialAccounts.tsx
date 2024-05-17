"use client";
import { API_STATUS } from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import parseFirebaseErrorMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage";
import { auth } from "@/src/firebase/config";
import { GoogleAuthProvider, User, linkWithPopup, unlink } from "firebase/auth";
import { Alert, Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { TiSocialGooglePlus } from "react-icons/ti";

export default function SocialAccounts() {
  const { user } = useAuth();

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [apiSuccessMessage, setApiSuccessMessage] = useState("");

  const handleCloseSuccessAlert = () => {
    setApiStatus(API_STATUS.IDLE);
  };

  const unLinkGoogleProvider = async () => {
    await unlink(auth.currentUser as User, "google.com")
      .then(() => {
        setApiStatus(API_STATUS.SUCCESS);
        setApiSuccessMessage("Your Google account was successfully unlinked.");
      })
      .catch((error) => {
        setApiStatus(API_STATUS.ERROR);
        setApiErrorMessage(parseFirebaseErrorMessage(error.message));
      });
  };

  const linkGoogleProvider = async () => {
    const provider = new GoogleAuthProvider();

    await linkWithPopup(auth.currentUser as User, provider)
      .then(() => {
        setApiStatus(API_STATUS.SUCCESS);
        setApiSuccessMessage("Your Google account was successfully linked.");
      })
      .catch((error) => {
        setApiStatus(API_STATUS.ERROR);
        setApiErrorMessage(parseFirebaseErrorMessage(error.message));
      });
  };

  const isGoogleLinked =
    user?.providerData.findIndex(
      ({ providerId }) => providerId === "google.com"
    ) !== -1;

  console.log(user?.providerData, "user.providerData");

  let isGoogleOnlyProvider = null;

  if (user) {
    isGoogleOnlyProvider =
      user.providerData.filter(({ providerId }) => providerId !== "google.com")
        ?.length === 0;
  }

  console.log(user, isGoogleOnlyProvider, "isGoogleOnlyProvider");

  return user ? (
    <div>
      <Card className="bg-gray-100 w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Social Accounts</h2>
        </div>

        {apiStatus === API_STATUS.SUCCESS ? (
          <Alert color="success" onDismiss={handleCloseSuccessAlert}>
            {apiSuccessMessage}
          </Alert>
        ) : null}
        {apiStatus === API_STATUS.ERROR ? (
          <Alert color="failure" onDismiss={handleCloseSuccessAlert}>
            <span className="font-medium">Error!</span>{" "}
            {apiErrorMessage || "Plese try again later."}
          </Alert>
        ) : null}

        <div className="mt-5 bg-white rounded-lg py-5 px-3 flex justify-between">
          <div className="flex space-x-1 items-center">
            <TiSocialGooglePlus size={28} />
            <span className="font-medium text-lg">Google</span>
          </div>
          {!isGoogleOnlyProvider ? (
            isGoogleLinked ? (
              <Button onClick={unLinkGoogleProvider} color="failure">
                Unlink Account
              </Button>
            ) : (
              <Button onClick={linkGoogleProvider}>Link Account</Button>
            )
          ) : (
            <span className="font-medium">{user.providerData[0].email}</span>
          )}
        </div>
      </Card>
    </div>
  ) : null;
}
