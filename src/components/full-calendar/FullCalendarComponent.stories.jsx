import React from "react";
import FullCalendarComponent from "./FullCalendarComponent";

export default {
  title: "Components/FullCalendar",
  component: FullCalendarComponent,
};

const Template = (args) => <FullCalendarComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};