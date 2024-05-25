"use client";
import React, { FormEvent, useState } from "react";
import { Button, Alert, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";
import {
  AUTH_FORM_STYLE,
  AUTH_HEADING_STYLE,
  AUTH_LINK_STYLE,
  AUTH_WRAPPER_STYLE,
} from "../common/styles";
import resetPassword from "@/src/firebase/auth/resetPassword";

export default function Page() {
  const [email, setEmail] = useState("");
  const [requestFinished, setRequestFinished] = useState(false);

  const [apiError, setApiError] = useState("");

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { error, errorMessage } = await resetPassword(email);

    if (error) {
      setApiError(errorMessage);
      return;
    }
    setRequestFinished(true);
  };

  return (
    <div className={`${AUTH_WRAPPER_STYLE}`}>
      <h1 className={AUTH_HEADING_STYLE}>Request Password Reset</h1>
      <form className={AUTH_FORM_STYLE} onSubmit={handleForm}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            value={email}
            id="email"
            type="email"
            placeholder="name@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit">Request Password Reset</Button>
      </form>
      {apiError && (
        <Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium">Error!</span> {apiError}
        </Alert>
      )}
      {requestFinished && (
        <Alert color="info" icon={HiInformationCircle} className="mt-5">
          <span className="font-semibold text-lg">Password Reset Sent!</span>
          <p className="my-1">
            {" "}
            We just sent a message to the email you provided with a link to
            reset your password. Please check your inbox or spam folder and
            follow the instructions in the email.
          </p>
          <Link href="/login" className={AUTH_LINK_STYLE}>
            Back to Log In
          </Link>
        </Alert>
      )}
    </div>
  );
}
