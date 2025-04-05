import { atom } from 'recoil';

export const authState = atom({
  key: "authState",
  default: {
    token: localStorage.getItem("authToken") || null,
    role: localStorage.getItem("role") || null,
    isFirstLogin: localStorage.getItem("isFirstLogin") === "true",
  },
});



