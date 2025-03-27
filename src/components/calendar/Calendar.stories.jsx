import React from "react";
import CustomCalendar from "./Calendar";

export default {
  title: "Components/Calendar",
  component: CustomCalendar,
};

const Template = (args) => <CustomCalendar {...args} />;

export const Default = Template.bind({});
Default.args = {};
