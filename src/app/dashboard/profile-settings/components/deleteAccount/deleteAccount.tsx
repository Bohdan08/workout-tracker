"use client";
import ActionModal from "@/src/app/common/components/actionModal";
import { API_STATUS } from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import parseFirebaseErrorMessage from "@/src/app/lib/utils/parseFirebaseErrorMessage";
import { auth } from "@/src/firebase/config";
import deleteUserData from "@/src/firebase/firestore/deleteUserData";
import { User, deleteUser, unlink } from "firebase/auth";
import { Alert, Button, Card } from "flowbite-react";
import React, { useState } from "react";

export default function DeleteAccount() {
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const { user } = useAuth();

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [apiSuccessMessage, setApiSuccessMessage] = useState("");

  const closeModal = () => setDeleteAccountModal(false);

  const handleCloseSuccessAlert = () => {
    setApiStatus(API_STATUS.IDLE);
  };

  const handleApiError = (error: Error) => {
    setApiStatus(API_STATUS.ERROR);
    setApiErrorMessage(parseFirebaseErrorMessage(error.message));
  };

  const deleteUserAccount = async () => {
    setDeleteAccountModal(false);
    const userId = user?.uid;

    if (userId) {
      // delete user and their data
      await deleteUser(user)
        .then(async () => {
          console.log(userId, "userId");
          await deleteUserData(userId)
            .then(() => {
              setApiStatus(API_STATUS.SUCCESS);
            })
            .catch(handleApiError);
        })
        .catch(handleApiError);
    }
  };

  return user ? (
    <>
      <div>
        <Card className="bg-gray-100 w-full">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Delete Account</h2>
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
            <Button onClick={() => setDeleteAccountModal(true)} color="failure">
              Delete Account
            </Button>
          </div>
          <p className="text-sm text-gray-900">
            You can delete your account at any time. However, this action is
            irreversible.
          </p>
        </Card>
      </div>
      <ActionModal
        title="Are you sure you want to delete your account?"
        showModal={deleteAccountModal}
        closeModal={closeModal}
        handleAccept={deleteUserAccount}
      />
    </>
  ) : null;
}
