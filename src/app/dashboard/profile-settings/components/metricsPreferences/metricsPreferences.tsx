"use client";
import {
  API_STATUS,
  CARD_ACTION_STATUS,
  DISTANCE_METRICS,
  WEIGHT_METRICS,
} from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import {
  setDistanceUnit,
  setWeightUnit,
} from "@/src/app/lib/store/features/userProfile/userProfileSlice";
import addUserData from "@/src/firebase/firestore/addUserData";
import { Alert, Button, Card, Label, Radio } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch } from "react-redux";

const WEIGHT_UNITS = [
  {
    value: "LBS",
    label: "Pounds (lbs)",
  },
  {
    value: "KG",
    label: "Kilograms (lg)",
  },
];

const DISTANCE_MAP: Record<string, string> = {
  MI: "Miles (mi)",
  KM: "Kilometers (km)",
};

const WEIGHT_MAP: Record<string, string> = {
  LBS: "Pounds (lbs)",
  KG: "Kilograms (kg)",
};

const DISTANCE_UNITS = [
  {
    value: "MI",
    label: "Miles (mi)",
  },
  {
    value: "KM",
    label: "Kilometers (km)",
  },
];

export default function MetricsPreferences() {
  const { user } = useAuth();
  const { data } = useAppSelector((store) => store.userProfile);

  const [cardStatus, setCardStatus] = useState(CARD_ACTION_STATUS.READ);
  const { weightUnit, distanceUnit } = data;

  const [newWeightUnit, setNewWeightUnit] = useState(weightUnit);
  const [newDistanceUnit, setNewDistanceUnit] = useState(distanceUnit);

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleCloseSuccessAlert = () => {
    setApiStatus(API_STATUS.IDLE);
  };

  const handleCloseErrorAlert = () => {
    setApiStatus(API_STATUS.IDLE);
    // reset states
    setNewWeightUnit(weightUnit);
    setNewDistanceUnit(distanceUnit);
  };

  const weightUnitTheSame = newWeightUnit === weightUnit;
  const distanceUnitTheSame = newDistanceUnit === distanceUnit;
  const fieldsChanged = !weightUnitTheSame || !distanceUnitTheSame;

  const cancelChanges = () => {
    // reset values
    setCardStatus(CARD_ACTION_STATUS.READ);
    setNewDistanceUnit(distanceUnit);
    setNewWeightUnit(weightUnit);
  };

  const saveChanges = async () => {
    if (fieldsChanged) {
      const { result, error, errorMessage } = await addUserData(
        user?.uid as string,
        {
          weightUnit: newWeightUnit,
          distanceUnit: newDistanceUnit,
        }
      );

      if (error) {
        setApiStatus(API_STATUS.ERROR);
        setApiErrorMessage(errorMessage);
        return;
      }

      setApiStatus(API_STATUS.SUCCESS);
      setCardStatus(CARD_ACTION_STATUS.READ);
      dispatch(setWeightUnit(newWeightUnit as WEIGHT_METRICS));
      dispatch(setDistanceUnit(newDistanceUnit as DISTANCE_METRICS));
    }
  };

  return (
    <div className="mt-5">
      <Card className="bg-gray-100 w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Preferences</h2>
          <div>
            {cardStatus === CARD_ACTION_STATUS.READ ? (
              <button onClick={() => setCardStatus(CARD_ACTION_STATUS.EDIT)}>
                <HiOutlinePencilAlt />
              </button>
            ) : null}
          </div>
        </div>
        {apiStatus === API_STATUS.SUCCESS ? (
          <Alert color="success" onDismiss={handleCloseSuccessAlert}>
            <span className="font-medium">Success!</span> Your preferences have
            been updated successfully!
          </Alert>
        ) : null}
        {apiStatus === API_STATUS.ERROR ? (
          <Alert color="failure" onDismiss={handleCloseErrorAlert}>
            <span className="font-medium">Error!</span>{" "}
            {apiErrorMessage || "Please try again later."}
          </Alert>
        ) : null}

        {/* WEIGHT UNITS */}
        <div className="mt-5 bg-white rounded-lg py-5 px-3">
          <div className="flex justify-between items-center">
            <div>
              <p>Weight Units</p>
            </div>
            <div>
              {cardStatus === CARD_ACTION_STATUS.READ ? (
                <p className="font-medium">
                  {WEIGHT_MAP[weightUnit as string]}
                </p>
              ) : null}
              {cardStatus === CARD_ACTION_STATUS.EDIT ? (
                <div className="flex flex-col space-y-3 w-40">
                  {WEIGHT_UNITS.map(({ value, label }) => (
                    <div
                      key={value}
                      className="flex items-center justify-start gap-2"
                    >
                      <Radio
                        id={value}
                        name="weight-units"
                        value={value}
                        checked={newWeightUnit === value}
                        onChange={() =>
                          setNewWeightUnit(value as WEIGHT_METRICS)
                        }
                      />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* DISTANCE UNITS */}
        <div className="bg-white rounded-lg py-5 px-3">
          <div className="flex justify-between items-center">
            <div>
              <p>Distance Units</p>
            </div>
            <div>
              {cardStatus === CARD_ACTION_STATUS.READ ? (
                <p className="font-medium">
                  {DISTANCE_MAP[distanceUnit as string]}
                </p>
              ) : null}
              {cardStatus === CARD_ACTION_STATUS.EDIT ? (
                <div className="flex flex-col space-y-3 w-40">
                  {DISTANCE_UNITS.map(({ value, label }) => (
                    <div
                      key={value}
                      className="flex items-center justify-start gap-2"
                    >
                      <Radio
                        id={value}
                        name="distance-units"
                        value={value}
                        checked={newDistanceUnit === value}
                        onChange={() =>
                          setNewDistanceUnit(value as DISTANCE_METRICS)
                        }
                      />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {cardStatus === CARD_ACTION_STATUS.EDIT &&
        apiStatus !== API_STATUS.SUCCESS ? (
          <div className="flex space-x-5">
            <Button disabled={!fieldsChanged} onClick={saveChanges}>
              Save
            </Button>
            <Button color="light" onClick={cancelChanges}>
              Cancel{" "}
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
