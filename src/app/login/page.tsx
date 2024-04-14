"use client";
import signIn from "@/src/firebase/auth/signIn";
import signUp from "@/src/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button, Alert, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";
import { addUserToken } from "../lib/actions";
import {
  AUTH_FORM_STYLE,
  AUTH_HEADING_STYLE,
  AUTH_LINK_STYLE,
  AUTH_WRAPPER_STYLE,
} from "../common/styles";

export default function Page() {
  const [email, setEmail] = useState("bohdan.martyniuk19@gmail.com");
  const [password, setPassword] = useState("ChocoPie11");
  const [apiError, setApiError] = useState("");

  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error, errorMessage } = await signIn(email, password);

    if (error) {
      setApiError(errorMessage);
      // return console.log(error);
    }

    if (result) {
      const currUser = result?.user;
      // successful
      const userToken = await currUser?.getIdToken();

      addUserToken(userToken);

      // redirect user to dashboard
      router.push("/dashboard/summary");
    }
  };

  return (
    <div className={`${AUTH_WRAPPER_STYLE}`}>
      <h1 className={AUTH_HEADING_STYLE}>Log in to Workout Tracker</h1>
      <form className={AUTH_FORM_STYLE} onSubmit={handleForm}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            value={email}
            id="email"
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit">Log in</Button>
      </form>
      {apiError && (
        <Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium">Error!</span> {apiError}
        </Alert>
      )}
      <div className="mt-5">
        <Link href="/reset-password" className={AUTH_LINK_STYLE}>
          I forgot my password
        </Link>
      </div>
      <div className="mt-5">
        <span>Not a member yet?</span>{" "}
        <Link href="/register" className={AUTH_LINK_STYLE}>
          Sign up for free
        </Link>
      </div>
    </div>
  );
}
