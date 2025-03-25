import React from 'react';
import DefaultButton from './Button';

export default {
  title: 'Components/DefaultButton',
  component: DefaultButton,
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    type: { control: 'text' },
    className: { control: 'text' },
  },
};

export const LoginButton = (args) => <DefaultButton {...args} />;
  LoginButton.args = {label: 'Login'};

export const SubmitButton = (args) => <DefaultButton {...args} />;
  SubmitButton.args = {label: 'Submit',type: 'submit',className: 'submit-btn'};
