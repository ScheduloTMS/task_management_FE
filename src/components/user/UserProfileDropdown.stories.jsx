import React from "react";
import UserDropdown from "./UserProfileDropdown";

export default {
  title: "Components/UserDropdown",
  component: UserDropdown,
  tags: ["autodocs"],
  argTypes: {
    userName: {
      control: "text",
      description: "The name to display next to the avatar",
      defaultValue: "Jane Joseph"
    },
    onProfileClick: {
      action: "profileClicked",
      description: "Callback when profile is clicked"
    },
    onChangePasswordClick: {
      action: "changePasswordClicked",
      description: "Callback when change password is clicked"
    },
    onLogoutClick: {
      action: "logoutClicked",
      description: "Callback when logout is clicked"
    }
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f5f5" },
        { name: "dark", value: "#333333" }
      ]
    }
  }
};

const Template = (args) => <UserDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  userName: "Jane Joseph"
};

export const WithLongName = Template.bind({});
WithLongName.args = {
  userName: "Dr. Jane Elizabeth Joseph-Smith"
};

export const DarkBackground = Template.bind({});
DarkBackground.args = {
  userName: "Jane Joseph"
};
DarkBackground.parameters = {
  backgrounds: { default: "dark" }
};