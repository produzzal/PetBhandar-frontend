"use client";
import { signIn } from "next-auth/react";
import React from "react";

const GoogleLoginButton = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
      >
        Login With Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
