import React from "react";
import Alert from "./Alert";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    icon: { control: { type: "select", options: ["success", "error", "warning"] } },
    redirectText: { control: "text" },
    redirectLink: { control: "text" },
  },
};

const Template = (args) => <Alert {...args} />;

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  title: "Password Updated!",
  message: 'Your password has been updated successfully.<br><br>Back to <a href="/home" class="swal-login-link">Log in</a>',
  icon: "success",

};

export const LoginSuccessAlert = Template.bind({}); 
LoginSuccessAlert.args = {
  title: "Login Successful!",
  message: "You have successfully signed into your account.",
  icon: "success",
  redirectText: "",
  redirectLink: "",
};

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  title: "Error!",
  message: "Something went wrong. Please try again.",
  icon: "error",
  redirectText: "",
  redirectLink: "",
};

