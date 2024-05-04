"use client";
import { API_STATUS, CARD_ACTION_STATUS } from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import parseFirebaseErorrMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage/parseFirebaseErorrMessage";
import { auth } from "@/src/firebase/config";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

const MIN_PASSWORD_LENGTH = 8;

export default function PasswordSettings() {
  const { user } = useAuth();

  const [cardStatus, setCardStatus] = useState(CARD_ACTION_STATUS.READ);

  const [currentPassowrd, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatPassword, setNewRepeatPassword] = useState("");

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [triedToSubmit, setTriedtoSubmit] = useState(false);

  const handleCloseSuccessAlert = () => {
    setApiStatus(API_STATUS.IDLE);
  };

  const cancelChanges = () => {
    // reset values
    setCurrentPassword("");
    setNewPassword("");
    setNewRepeatPassword("");
    setCardStatus(CARD_ACTION_STATUS.READ);
  };

  const newPasswordsMatch = newPassword === newRepeatPassword;

  const onChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setTriedtoSubmit(true);
    if (newPasswordsMatch && auth?.currentUser?.email) {
      // retauthenticate user to assure they typed the correct current password
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassowrd
      );

      await reauthenticateWithCredential(auth.currentUser, credential)
        .then(async () => {
          await updatePassword(auth.currentUser as User, newPassword)
            .then(() => {
              setApiStatus(API_STATUS.SUCCESS);
            })
            .catch((error) => {
              setApiStatus(API_STATUS.ERROR);
              setApiErrorMessage(parseFirebaseErorrMessage(error.message));
            });
        })
        .catch((error) => {
          setApiStatus(API_STATUS.ERROR);
          setApiErrorMessage(parseFirebaseErorrMessage(error.message));
        });
    }
  };

  return user ? (
    <div>
      <Card className="bg-gray-100 w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Password</h2>
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
          <Alert color="success" onDismiss={handleCloseSuccessAlert}>
            <span className="font-medium">Success!</span> Your passport has been
            updated successfully.
          </Alert>
        ) : null}
        {apiStatus === API_STATUS.ERROR ? (
          <Alert color="failure" onDismiss={handleCloseSuccessAlert}>
            <span className="font-medium">Error!</span>{" "}
            {apiErrorMessage || "Please try again later."}
          </Alert>
        ) : null}

        <div className="mt-5 bg-white rounded-lg py-5 px-3">
          <div>
            {cardStatus === CARD_ACTION_STATUS.READ ? (
              <p className="font-medium">●●●●●●●●●●●●</p>
            ) : null}
          </div>
          {cardStatus === CARD_ACTION_STATUS.EDIT ? (
            <form onSubmit={onChangePassword}>
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label htmlFor="new-password" value="New Password *" />
                </div>
                <div>
                  <TextInput
                    id="new-password"
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                    minLength={MIN_PASSWORD_LENGTH}
                    type="password"
                    required
                  />
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 block">
                  <Label
                    htmlFor="new-repeated-password"
                    value="Confirm New Password *"
                  />
                </div>
                <div>
                  <TextInput
                    id="new-repeated-password"
                    value={newRepeatPassword}
                    onChange={({ target }) =>
                      setNewRepeatPassword(target.value)
                    }
                    minLength={MIN_PASSWORD_LENGTH}
                    type="password"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="current-password" value="Current Password *" />
                </div>
                <div>
                  <TextInput
                    id="current-password"
                    value={currentPassowrd}
                    onChange={({ target }) => setCurrentPassword(target.value)}
                    minLength={MIN_PASSWORD_LENGTH}
                    type="password"
                    required
                  />
                </div>
              </div>
              {triedToSubmit && !newPasswordsMatch ? (
                <div className="mt-5">
                  <p className="text-red-500">Passwords don't match</p>
                </div>
              ) : null}
              <div className="flex space-x-5 mt-5">
                <Button type="submit">Save</Button>
                <Button type="button" color="light" onClick={cancelChanges}>
                  Cancel{" "}
                </Button>
              </div>
            </form>
          ) : null}
        </div>
      </Card>
    </div>
  ) : null;
}
