import React from "react";
import Input from "./Input";
import { BsPerson, BsLock } from "react-icons/bs";

export default {
  title: "Components/Input",
  component: Input,
};

export const Username = () => <Input type="text" placeholder="Enter your username" icon={<BsPerson />} />;
export const Password = () => <Input type="password" placeholder="Enter your password" icon={<BsLock />} />;
