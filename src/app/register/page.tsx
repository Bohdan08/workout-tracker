"use client";
import signUp from "@/src/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button, Alert, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";
import { AUTH_LINK_STYLE, AUTH_WRAPPER_STYLE } from "../common/styles";
import { sendEmailVerification } from "firebase/auth";
import addData from "@/src/firebase/firestore/addUserData";
import { serverTimestamp } from "firebase/firestore";

const MIN_PASSWORD_LENGTH = 8;

export default function Page() {
  const [email, setEmail] = useState("bohdan.martyniuk19@gmail.com");
  const [password, setPassword] = useState("ChocoPie11");
  const [repeatPassword, setRepeatPassword] = useState("ChocoPie11");
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    if (password === repeatPassword) {
      const { result, error, errorMessage } = await signUp(email, password);

      if (error) {
        setApiError(errorMessage);
        return;
      }

      if (result) {
        const newUser = result.user;
        console.log(newUser, "newUser");
        // send verification email
        sendEmailVerification(newUser);

        // create user in firestore
        const initData = {
          created: serverTimestamp(),
          email: email?.toLocaleLowerCase().trim(),
          providerData: newUser.providerData || null,
        };

        // add user to firestore
        const newUserResult = await addData(newUser.uid, initData);

        if (newUserResult.error) {
          setApiError(newUserResult.errorMessage);
          return;
        }

        // redirect user to dashboard
        router.push("/dashboard/summary");
      }
    }
  };

  return (
    <div className={`mx-auto mt-10 flex flex-col ${AUTH_WRAPPER_STYLE}`}>
      <h1 className="text-center text-3xl font-semibold">
        Get started for free
      </h1>
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
        <span>Already have an account?</span>{" "}
        <Link href="/login" className={AUTH_LINK_STYLE}>
          Log in
        </Link>
      </div>
    </div>
  );
}
