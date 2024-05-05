"use client";
import { API_STATUS, CARD_ACTION_STATUS } from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import { setEmail } from "@/src/app/lib/store/features/userProfile/userProfileSlice";
import parseFirebaseErrorMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage";
import { auth } from "@/src/firebase/config";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
} from "firebase/auth";
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch } from "react-redux";

export default function EmailSettings() {
  const { user } = useAuth();

  const [cardStatus, setCardStatus] = useState(CARD_ACTION_STATUS.READ);
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleCloseSuccessAlert = () => {
    setApiStatus(API_STATUS.IDLE);
  };

  const cancelChanges = () => {
    // reset values
    setCardStatus(CARD_ACTION_STATUS.READ);
    setNewEmail(user?.email || "");
  };

  const handleApiError = (error: Error) => {
    setApiStatus(API_STATUS.ERROR);
    setApiErrorMessage(parseFirebaseErrorMessage(error.message));
  };

  const onChangeEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      auth?.currentUser &&
      user?.uid &&
      newEmail &&
      newEmail !== user?.email &&
      auth.currentUser.email
    ) {
      // retauthenticate user to assure they typed the correct current password
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );

      await reauthenticateWithCredential(auth.currentUser, credential)
        .then(async () => {
          await updateEmail(auth.currentUser as User, newEmail)
            .then(() => {
              sendEmailVerification(auth.currentUser as User)
                .then(() => {
                  setApiStatus(API_STATUS.SUCCESS);
                  setCardStatus(CARD_ACTION_STATUS.READ);
                  dispatch(setEmail(newEmail as string));
                })
                .catch(handleApiError);
            })
            .catch(handleApiError);
        })
        .catch(handleApiError);
    }
  };

  console.log(user, "USER");
  return user ? (
    <div>
      <Card className="bg-gray-100 w-full">
        <form onSubmit={onChangeEmail}>
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Email</h2>
            <div>
              {cardStatus === CARD_ACTION_STATUS.READ ? (
                <button
                  onClick={() => {
                    setCardStatus(CARD_ACTION_STATUS.EDIT);
                    setApiStatus(API_STATUS.IDLE);
                  }}
                >
                  <HiOutlinePencilAlt />
                </button>
              ) : null}
            </div>
          </div>
          {apiStatus === API_STATUS.SUCCESS ? (
            <Alert
              className="mt-5"
              color="success"
              onDismiss={handleCloseSuccessAlert}
            >
              <span className="font-medium">Success!</span> We just sent a
              verification message to your new email. Please check your inbox or
              spam folder and follow the instructions in the email.
            </Alert>
          ) : null}
          {apiStatus === API_STATUS.ERROR ? (
            <Alert
              className="mt-5"
              color="failure"
              onDismiss={handleCloseSuccessAlert}
            >
              <span className="font-medium">Error!</span>{" "}
              {apiErrorMessage || "Plese try again later."}
            </Alert>
          ) : null}

          <div className="mt-5 bg-white rounded-lg py-5 px-3">
            <div>
              {cardStatus === CARD_ACTION_STATUS.READ ? (
                <p className="font-medium">{user.email}</p>
              ) : null}
            </div>
            {cardStatus === CARD_ACTION_STATUS.EDIT ? (
              <div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="new-email" value="New Email *" />
                  </div>
                  <TextInput
                    id="new-email"
                    type="email"
                    value={newEmail || ""}
                    onChange={({ target }) => setNewEmail(target.value)}
                    required
                  />
                </div>
                <div className="mt-5">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="confirm-password"
                      value="Confirm Your Password *"
                    />
                  </div>
                  <TextInput
                    id="confirm-password"
                    type="password"
                    value={currentPassword}
                    minLength={8}
                    onChange={({ target }) => setCurrentPassword(target.value)}
                    required
                  />
                </div>

                <div className="flex space-x-5 mt-5">
                  <Button type="submit" disabled={newEmail === user.email}>
                    Save
                  </Button>
                  <Button type="button" color="light" onClick={cancelChanges}>
                    Cancel{" "}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </Card>
    </div>
  ) : null;
}
