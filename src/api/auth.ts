import { API_BASE_URL } from "@/constants/config";
import axios from "axios";

// Base URL of the external API

export interface SignupData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  gender: string;
  maritalstatus: string;
  occupation: string;
  dob: string;
  religion: string;
  country: string;
  state: string;
  language: string;
}

/**
 * Function to handle user signup.
 *
 * @param userData - Object containing user details for signup.
 */
export const signup = async (userData: SignupData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/**
 * Function to confirm verification code.
 *
 * @param code - Verification code to confirm.
 */
export const confirmVerificationCode = async (code: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/confirmcode`,
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Code verification error:", error);
    throw error;
  }
};

export interface ResetPasswordData {
  email: string;
  currentpassword: string;
  newpassword: string;
}

/**
 * Function to reset user password.
 *
 * @param resetData - Object containing email, current password, and new password.
 */
export const resetPassword = async (resetData: ResetPasswordData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/reset/password`,
      resetData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
};

/**
 * Function to initiate password reset via email.
 *
 * @param email - The user's email for password recovery.
 */
export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/forgot/password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

export interface LoginData {
  email: string;
  password: string;
}

/**
 * Function to log in the user.
 *
 * @param loginData - Object containing email and password for login.
 */

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    let errorMessage = "Login error";
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else {
      errorMessage = "An unexpected error occurred";
    }
    throw new Error(errorMessage);
  }
};
