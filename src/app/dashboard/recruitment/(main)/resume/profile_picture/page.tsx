import React from "react";
import ProfilePictureClient from "../../../_components/profile-picture-client";
import { routes } from "@/constants/routes";

function ProfilePicture() {
  return <ProfilePictureClient next_route={routes.RECRUITMENT_CV} />;
}

export default ProfilePicture;
