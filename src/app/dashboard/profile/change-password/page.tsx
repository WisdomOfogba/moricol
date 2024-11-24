import React from "react";
import ChangePasswordClient from "../_components/change-password-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change your password",
};

function ChangePassword() {
  return <ChangePasswordClient />;
}

export default ChangePassword;
