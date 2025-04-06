import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    token: localStorage.getItem("authToken") || null,
    role: localStorage.getItem("role") || null,
    isFirstLogin: localStorage.getItem("isFirstLogin") === "true",
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    photo: localStorage.getItem("photo") || "",
  },
});
