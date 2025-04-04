import AssignedStudents from "./AssignedStudents";

export default {
  title: "Mentor/AssignedStudents",
  component: AssignedStudents,
};

const Template = (args) => <AssignedStudents {...args} />;

export const Default = Template.bind({});
Default.args = {
  students: [
    {
      id: "1",
      name: "John Doe",
      photo: "/images/john.jpg",
      submitted: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      photo: "/images/jane.jpg",
      submitted: false,
    },
  ],
};
