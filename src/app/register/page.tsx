"use client";
import signUp from "@/src/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { Button, Alert, Label, TextInput, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";
import { AUTH_LINK_STYLE, AUTH_WRAPPER_STYLE } from "../common/styles";
import {
  GoogleAuthProvider,
  getRedirectResult,
  sendEmailVerification,
  signInWithRedirect,
} from "firebase/auth";
import addData from "@/src/firebase/firestore/addUserData";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "@/src/firebase/config";
import parseFirebaseErrorMessage from "../lib/utils/parseFirebaseErrorMessage";
import { DISTANCE_METRICS, WEIGHT_METRICS } from "../common/enums";
import { addUserToken } from "../lib/actions/addUserToken/addUserToken";

const MIN_PASSWORD_LENGTH = 8;

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setApiError("Passwords don't match.");
      return;
    }

    const { result, error, errorMessage } = await signUp(email, password);

    if (error) {
      setLoading(false);
      setApiError(errorMessage);
      return;
    }

    if (result) {
      const newUser = result.user;
      const userToken = await newUser.getIdToken();
      // send verification email
      sendEmailVerification(newUser);

      // create user in firestore
      const initData = {
        created: serverTimestamp(),
        email: email?.toLocaleLowerCase().trim(),
        // add init miles and pounds - later can be changed in settings
        distanceUnit: DISTANCE_METRICS.MIL,
        weightUnit: WEIGHT_METRICS.LBS,
      };

      // add user to firestore
      const newUserResult = await addData(newUser.uid, initData);

      if (newUserResult.error) {
        setLoading(false);
        setApiError(newUserResult.errorMessage);
        return;
      }

      // redirect user to dashboard
      await addUserToken(userToken).then(() => {
        router.push("/dashboard/profile-settings");
      });
    }
  };

  const handleRedirect = async () => {
    try {
      const userCred = await getRedirectResult(auth);

      if (userCred) {
        setLoading(true);
        // check if user already exists
        if (userCred.user.providerData?.length > 1) {
          setApiError("Email already in use.");
          setLoading(false);
        } else {
          const newUser = userCred.user;
          const userSocialData = userCred.user.providerData[0];
          const userToken = await userCred?.user.getIdToken();

          // create a user in firestore
          const initData = {
            created: serverTimestamp(),
            firstName: userSocialData.displayName || "",
            email: userSocialData.email?.toLocaleLowerCase().trim(),
            // add init miles and pounds - later can be changed in settings
            distanceUnit: DISTANCE_METRICS.MIL,
            weightUnit: WEIGHT_METRICS.LBS,
          };

          const newUserResult = await addData(newUser.uid, initData);

          if (newUserResult.error) {
            setLoading(false);
            setApiError(newUserResult.errorMessage);
            return;
          }
          // redirect user to dashboard
          await addUserToken(userToken).then(() => {
            router.push("/dashboard/profile-settings");
          });
        }
      }
    } catch (error: any) {
      setLoading(false);
      setApiError(parseFirebaseErrorMessage(error.message));
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  const onSignUpWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithRedirect(auth, googleProvider).catch((error) => {
      setLoading(false);
      setApiError(parseFirebaseErrorMessage(error.message));
    });
  };

  return (
    <div className={`mx-auto mt-10 flex flex-col ${AUTH_WRAPPER_STYLE}`}>
      <h1 className="text-center text-3xl font-semibold">Create Account</h1>
      <form
        className="flex max-w-md w-full flex-col gap-4 mt-10"
        onSubmit={handleForm}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            value={email}
            id="email1"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            value={password}
            id="password"
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat Passowrd" />
          </div>
          <TextInput
            value={repeatPassword}
            id="repeat-password"
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
      {apiError && (
        <Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium">Error!</span> {apiError}
        </Alert>
      )}

      <div className="mt-5">
        By signing up, you agree to the Workout Tracker{" "}
        <Link
          href="/terms"
          className="text-blue-700 hover:no-underline underline"
        >
          {" "}
          Terms and Conditions{" "}
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-blue-700 hover:no-underline underline"
        >
          {" "}
          Privacy Policy
        </Link>
        .
      </div>
      <div className="mt-5">
        <p className="font-semibold"> Or sign up using:</p>
        <div className="mt-2">
          <button
            className="w-fit h-fit p-4 rounded bg-white hover:bg-gray-100 border border-black flex items-center justify-center"
            onClick={onSignUpWithGoogle}
          >
            <GoogleIcon />
            {loading ? <Spinner size="sm" className="relative left-2" /> : null}
          </button>
        </div>
      </div>
      <div className="mt-5">
        <span>Already have an account?</span>{" "}
        <Link href="/login" className={AUTH_LINK_STYLE}>
          Log in
        </Link>
      </div>
    </div>
  );
}

const GoogleIcon = () => (
  <svg width="18" height="18">
    <title>Google</title>
    <g fill="none" fillRule="evenodd">
      <path
        d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
        fill="#EA4335"
      ></path>
      <path
        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
        fill="#4285F4"
      ></path>
      <path
        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
        fill="#FBBC05"
      ></path>
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
        fill="#34A853"
      ></path>
      <path d="M0 0h18v18H0V0z"></path>
    </g>
  </svg>
);
