import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    token: localStorage.getItem("authToken") || null,
    role: null,
    isFirstLogin: true,  
  },
});


