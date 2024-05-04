"use client";
import { API_STATUS, CARD_ACTION_STATUS } from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import { setEmail } from "@/src/app/lib/store/features/userProfile/userProfile";
import parseFirebaseErrorMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage";
import { auth } from "@/src/firebase/config";
import { User, sendEmailVerification, updateEmail } from "firebase/auth";
import { Alert, Button, Card, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch } from "react-redux";

export default function LoginSettings() {
  const { user } = useAuth();

  const [cardStatus, setCardStatus] = useState(CARD_ACTION_STATUS.READ);
  const [newEmail, setNewEmail] = useState(user?.email || "");

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
  const saveChanges = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      auth?.currentUser &&
      user?.uid &&
      newEmail &&
      newEmail !== user?.email
    ) {
      await updateEmail(auth.currentUser, newEmail)
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
    }
  };

  return user ? (
    <div>
      <Card className="bg-gray-100 w-full">
        <form onSubmit={saveChanges}>
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
              <TextInput
                className="mt-2"
                type="email"
                value={newEmail || ""}
                onChange={({ target }) => setNewEmail(target.value)}
              />
            ) : null}
          </div>

          {cardStatus === CARD_ACTION_STATUS.EDIT &&
          apiStatus !== API_STATUS.SUCCESS ? (
            <div className="flex space-x-5 mt-5">
              <Button type="submit" disabled={newEmail === user.email}>
                Save
              </Button>
              <Button type="button" color="light" onClick={cancelChanges}>
                Cancel{" "}
              </Button>
            </div>
          ) : null}
        </form>
      </Card>
    </div>
  ) : null;
}
