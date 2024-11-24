"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { BiLock } from "react-icons/bi";
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Button from "@/components/button";
import { resetPassword } from "@/api/auth";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { Session } from "next-auth";

export default function ChangePasswordClient() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
      alert("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      alert("Current and new passwords cannot be the same");
      return;
    }


    setLoading(true);
    try {
      await resetPassword({
        userid: session?.user?.id as string,
        currentpassword: currentPassword,
        newpassword: newPassword,
      }, session as Session);

      enqueueSnackbar("Password updated successfully", { variant: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      enqueueSnackbar("Error updating password", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-5 mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="block pb-2" htmlFor="current-password">
            Current Password
          </Label>
          <div className="relative">
            <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              className="pl-10 pr-10 focus:pl-10"
              placeholder="Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => togglePasswordVisibility("current")}
            >
              {showCurrentPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <BsEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label className="block pb-2" htmlFor="new-password">
            New Password
          </Label>
          <div className="relative">
            <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              className="pl-10 pr-10 focus:pl-10"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showNewPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <BsEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label className="block pb-2" htmlFor="confirm-password">
            Confirm New Password
          </Label>
          <div className="relative">
            <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              className="pl-10 pr-10 focus:pl-10"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <BsEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600"
        >
          {loading ? <Loader2 className="animate-spin" /> : "UPDATE"}
        </Button>
      </form>
    </div>
  );
}
