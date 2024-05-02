"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchUserData } from "../../lib/store/features/userProfile/userProfile";
import useAppDispatch from "../../hooks/useAppDispatch";
import { API_STATUS } from "../../common/enums";
import LoadingView from "../components/loadingView/loadingView";
import { Button, Card, Checkbox, Label, Radio } from "flowbite-react";
import ReactSelect from "react-select";
import { HiOutlinePencilAlt } from "react-icons/hi";
import SuccessView from "./views/successView/successView";

enum ACTION_STATUS {
  READ = "read",
  EDIT = "edit",
}

const WEIGHT_UNITS = [
  {
    value: "LBS",
    label: "Pounds (LBS)",
  },
  {
    value: "KG",
    label: "Kilograms (KG)",
  },
];

export default function Settings() {
  const [cardStatus, setCardStatus] = useState(ACTION_STATUS.READ);

  const { user } = useAuth();
  const userProfile = useAppSelector((store) => store.userProfile);

  const { apiStatus, data } = userProfile;

  console.log(userProfile, "userProfile");
  console.log(user, "user");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.uid && apiStatus === API_STATUS.IDLE) {
      dispatch(fetchUserData(user.uid));
    }
  }, [user?.uid]);

  const convertArrayStringsToSelectOptions = (data: string[]) =>
    data.map((label) => ({
      value: label.toLowerCase(),
      label,
    }));

  return (
    <div>
      {apiStatus === API_STATUS.LOADING ? (
        <LoadingView title="Retrieving your profile" />
      ) : null}
      {apiStatus === API_STATUS.SUCCESS ? <SuccessView /> : null}
    </div>
  );
}
