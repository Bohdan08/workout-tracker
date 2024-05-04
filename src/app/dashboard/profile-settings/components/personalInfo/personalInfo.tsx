"use client";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/src/app/common/constants";
import { API_STATUS, CARD_ACTION_STATUS } from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import {
  setFirstName,
  setLastName,
} from "@/src/app/lib/store/features/userProfile/userProfile";
import addUserData from "@/src/firebase/firestore/addUserData";
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch } from "react-redux";

export default function PersonalInfo() {
  const { user } = useAuth();
  const { data } = useAppSelector((store) => store.userProfile);

  const { firstName = " ", lastName = "" } = data;

  const [cardStatus, setCardStatus] = useState(CARD_ACTION_STATUS.READ);

  const [newFirstName, setNewfirstName] = useState<string>(firstName);
  const [newLastName, setNewLastName] = useState<string>(lastName);

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleCloseSuccessAlert = () => {
    setApiStatus(API_STATUS.IDLE);
  };

  const firstNameTheSame = firstName === newFirstName.trim();
  const lastNameTheSame = lastName === newLastName.trim();

  const firstNameValid = newFirstName.length >= NAME_MIN_LENGTH;
  const lastNameValid = newLastName.length >= NAME_MIN_LENGTH;

  const personalInfoChanged = !firstNameTheSame || !lastNameTheSame;

  const newValuesValid = firstNameValid && lastNameValid;

  const cancelChanges = () => {
    // reset values
    setCardStatus(CARD_ACTION_STATUS.READ);
    setNewLastName(lastName);
    setNewfirstName(firstName);
  };

  const onChangePersonalInfo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user?.uid && newValuesValid && personalInfoChanged) {
      const { error, errorMessage } = await addUserData(user.uid, {
        firstName: newFirstName.trim(),
        lastName: newLastName.trim(),
      });

      if (error) {
        setApiStatus(API_STATUS.ERROR);
        setApiErrorMessage(errorMessage);
        return;
      }

      setApiStatus(API_STATUS.SUCCESS);
      setCardStatus(CARD_ACTION_STATUS.READ);
      dispatch(setFirstName(newFirstName));
      dispatch(setLastName(newLastName));
    }
  };

  return (
    <div className="mt-5">
      <Card className="bg-gray-100 w-full">
        <form onSubmit={onChangePersonalInfo}>
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Personal Info</h2>
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
            <Alert className="mt-5" color="success" onDismiss={handleCloseSuccessAlert}>
              <span className="font-medium">Success!</span> Your personal
              information has been updated updated!
            </Alert>
          ) : null}
          {apiStatus === API_STATUS.ERROR ? (
            <Alert className="mt-5" color="failure" onDismiss={handleCloseSuccessAlert}>
              <span className="font-medium">Error!</span>{" "}
              {apiErrorMessage || "Plese try again later."}
            </Alert>
          ) : null}

          {/* first name */}
          <div className="mt-5 bg-white rounded-lg py-5 px-3">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="first-name">First Name</Label>
              </div>
              <div>
                {cardStatus === CARD_ACTION_STATUS.READ ? (
                  <p className="font-medium">{firstName}</p>
                ) : null}
              </div>
            </div>
            {cardStatus === CARD_ACTION_STATUS.EDIT ? (
              <TextInput
                id="first-name"
                className="mt-2"
                value={newFirstName}
                onChange={({ target }) => setNewfirstName(target.value)}
                minLength={NAME_MIN_LENGTH}
                maxLength={NAME_MAX_LENGTH}
              />
            ) : null}
          </div>

          {/* last name */}
          <div className="bg-white rounded-lg py-5 px-3 mt-5">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="last-name">Last Name</Label>
              </div>
              <div>
                {cardStatus === CARD_ACTION_STATUS.READ ? (
                  <p className="font-medium">{lastName}</p>
                ) : null}
              </div>
            </div>
            {cardStatus === CARD_ACTION_STATUS.EDIT ? (
              <TextInput
                id="last-name"
                className="mt-2"
                value={newLastName}
                onChange={({ target }) => setNewLastName(target.value)}
                minLength={NAME_MIN_LENGTH}
                maxLength={NAME_MAX_LENGTH}
              />
            ) : null}
          </div>

          {cardStatus === CARD_ACTION_STATUS.EDIT &&
          apiStatus !== API_STATUS.SUCCESS ? (
            <div className="flex space-x-5 mt-5">
              <Button
                type="submit"
                disabled={
                  !personalInfoChanged || !firstNameValid || !lastNameValid
                }
              >
                Save
              </Button>
              <Button color="light" onClick={cancelChanges}>
                Cancel{" "}
              </Button>
            </div>
          ) : null}
        </form>
      </Card>
    </div>
  );
}
