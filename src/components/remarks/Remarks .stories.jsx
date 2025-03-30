import React from "react";
import Remarks from "./Remarks";

export default {
  title: "Components/Remarks",
  component: Remarks,
};

const dummyRemarks = [
  {
    id: 1,
    user: {
      name: "Alice Smith",
      profile_photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg",
    },
    content: "This is an amazing feature!",
  },
  {
    id: 2,
    user: {
      name: "Bob Johnson",
      profile_photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg",
    },
    content: "Looks great! Can't wait to use it.",
  },
];

const Template = (args) => <Remarks {...args} />;

export const Default = Template.bind({});
Default.args = {
  remarks: dummyRemarks,
};
