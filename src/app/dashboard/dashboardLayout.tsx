"use client";
import React from "react";
import { useEffect } from "react";
import { fetchUserData } from "../lib/store/features/userProfile/userProfileSlice";
import useAppSelector from "../hooks/useAppSelector";
import { API_STATUS } from "../common/enums";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchWorkoutsHistory } from "../lib/store/features/workoutsHistory/workoutsHistorySlice";
import { useAuth } from "../context/authContext";
import Header from "../common/components/header";
import Menu from "./components/menu";
import LoadingView from "./components/loadingView/loadingView";
import MobileMenu from "./components/menu/mobileMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const userProfile = useAppSelector((store) => store.userProfile);
  const workoutsHistory = useAppSelector((store) => store.workoutsHistory);

  useEffect(() => {
    if (user?.uid && userProfile.apiStatus === API_STATUS.IDLE) {
      dispatch(fetchUserData(user.uid));
    }
  }, [user?.uid, userProfile.apiStatus]);

  useEffect(() => {
    if (user?.uid && workoutsHistory.apiStatus === API_STATUS.IDLE) {
      dispatch(fetchWorkoutsHistory(user.uid));
    }
  }, [user, workoutsHistory.apiStatus, dispatch]);

  const isLoading =
    workoutsHistory.apiStatus === API_STATUS.LOADING ||
    userProfile.apiStatus === API_STATUS.LOADING;

  return (
    <div className="flex min-h-screen flex-col">
      {" "}
      <main className="grow">
        <div className="md:flex md:space-x-2">
          <MobileMenu />
          <Menu />
          <div className="w-full px-2 md:px-4 pt-4 pb-10">
            {isLoading ? (
              <LoadingView title="Retrieving your account" />
            ) : (
              children
            )}
            {/* {children} */}
          </div>
        </div>
      </main>
    </div>
  );
}
