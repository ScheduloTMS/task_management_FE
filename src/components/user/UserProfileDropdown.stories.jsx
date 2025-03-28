import UserProfileDropdown from './UserProfileDropdown';

export default {
  title: 'Components/UserProfileDropdown',
  component: UserProfileDropdown,
  argTypes: {
    user: {
      control: 'object',
      defaultValue: {
        name: 'Jane Joseph',
        avatar: ''
      }
    }
  }
};

const Template = (args) => <UserProfileDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'Jane Joseph',
    avatar: ''
  }
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  user: {
    name: 'Jane Joseph',
    avatar: 'frontend/src/assets/Shape.png'
  }
};