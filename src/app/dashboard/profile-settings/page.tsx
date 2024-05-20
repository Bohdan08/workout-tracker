"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchUserData } from "../../lib/store/features/userProfile/userProfileSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { API_STATUS } from "../../common/enums";
import LoadingView from "../components/loadingView/loadingView";
import SuccessView from "./views/successView/successView";
import ErrorView from "../components/errorView";

export default function Settings() {
  const { user } = useAuth();
  const userProfile = useAppSelector((store) => store.userProfile);

  const { apiStatus } = userProfile;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.uid && apiStatus === API_STATUS.IDLE) {
      dispatch(fetchUserData(user.uid));
    }
  }, [user?.uid]);

  return (
    <div>
      {apiStatus === API_STATUS.ERROR ? (
        <ErrorView message={userProfile.apiErrorMessage} />
      ) : null}
      {apiStatus === API_STATUS.LOADING ? (
        <LoadingView title="Retrieving your profile" />
      ) : null}
      {apiStatus === API_STATUS.SUCCESS ? <SuccessView /> : null}
    </div>
  );
}
