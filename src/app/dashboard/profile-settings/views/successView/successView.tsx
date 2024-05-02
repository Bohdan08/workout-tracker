"use client";
import {
  API_STATUS,
  DISTANCE_METRICS,
  WEIGHT_METRICS,
} from "@/src/app/common/enums";
import { useAuth } from "@/src/app/context/authContext";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import {
  setDistanceUnit,
  setWeightUnit,
} from "@/src/app/lib/store/features/userProfile/userProfile";
import addUserData from "@/src/firebase/firestore/addUserData";
import { Alert, Button, Card, Label, Radio, Toast } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlinePencilAlt, HiCheck } from "react-icons/hi";
import { useDispatch } from "react-redux";

enum ACTION_STATUS {
  READ = "read",
  EDIT = "edit",
}

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
  KM: "Kilograms (kg)",
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

export default function SuccessView() {
  const [cardStatus, setCardStatus] = useState(ACTION_STATUS.READ);

  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);

  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { user } = useAuth();
  const { data } = useAppSelector((store) => store.userProfile);

  const dispatch = useDispatch();

  const { weightUnit, distanceUnit } = data;

  const handleWeightUnit = (newWeightUnit: WEIGHT_METRICS) =>
    dispatch(setWeightUnit(newWeightUnit));

  const handleDistanceUnit = (newDistanceUnit: DISTANCE_METRICS) =>
    dispatch(setDistanceUnit(newDistanceUnit));

  const handleCloseSuccessAlert = () => {
    setApiStatus(API_STATUS.IDLE);
  };

  const saveChanges = async () => {
    const { result, error, errorMessage } = await addUserData(
      user?.uid as string,
      {
        weightUnit,
        distanceUnit,
      }
    );

    if (error) {
      setApiErrorMessage(errorMessage);
      return;
    }

    setApiStatus(API_STATUS.SUCCESS);
    setCardStatus(ACTION_STATUS.READ);
  };

  return (
    <div>
      <h2 className="text-3xl font-medium">Settings</h2>
      <div className="mt-5">
        <Card className="bg-gray-100 max-w-md w-full">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Preferences</h2>
            <div>
              {cardStatus === ACTION_STATUS.READ ? (
                <button onClick={() => setCardStatus(ACTION_STATUS.EDIT)}>
                  <HiOutlinePencilAlt />
                </button>
              ) : null}
            </div>
          </div>
          {apiStatus === API_STATUS.SUCCESS ? (
            <Alert color="success" onDismiss={handleCloseSuccessAlert}>
              <span className="font-medium">Success!</span> Your preferences
              have been updated successfully!
            </Alert>
          ) : null}

          {/* WEIGHT UNITS */}
          <div className="mt-5 bg-white rounded-lg py-3 px-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Weight Units</p>
              </div>
              <div>
                {cardStatus === ACTION_STATUS.READ ? (
                  <p className="font-medium">
                    {WEIGHT_MAP[weightUnit as string]}
                  </p>
                ) : null}
                {cardStatus === ACTION_STATUS.EDIT ? (
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
                          checked={weightUnit === value}
                          onChange={() =>
                            handleWeightUnit(value as WEIGHT_METRICS)
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
          <div className="bg-white rounded-lg py-3 px-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Distance Units</p>
              </div>
              <div>
                {cardStatus === ACTION_STATUS.READ ? (
                  <p className="font-medium">
                    {DISTANCE_MAP[distanceUnit as string]}
                  </p>
                ) : null}
                {cardStatus === ACTION_STATUS.EDIT ? (
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
                          checked={distanceUnit === value}
                          onChange={() =>
                            handleDistanceUnit(value as DISTANCE_METRICS)
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

          {cardStatus === ACTION_STATUS.EDIT &&
          apiStatus !== API_STATUS.SUCCESS ? (
            <div className="flex space-x-5">
              <Button onClick={saveChanges}>Save</Button>
              <Button
                color="light"
                onClick={() => setCardStatus(ACTION_STATUS.READ)}
              >
                Cancel{" "}
              </Button>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
