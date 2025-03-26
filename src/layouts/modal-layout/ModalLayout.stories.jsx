
import React from 'react';
import {
  SuccessAlert,
  LoginSuccessAlert,
  ErrorAlert,
  WarningAlert
} from './ModalLayout';


const AlertWrapper = ({ Component, ...args }) => {
  React.useEffect(() => {
    return () => {
      const sweetAlert = document.querySelector('.swal-overlay');
      if (sweetAlert) sweetAlert.remove();
    };
  }, []);
  return <Component {...args} />;
};

export default {
  title: 'Layouts/ModalLayout',
  parameters: {
    docs: { disable: true },
  },
};


export const PasswordSuccess = () => (
  <AlertWrapper Component={SuccessAlert} />
);


export const LoginSuccess = () => (
  <AlertWrapper Component={LoginSuccessAlert} />
);


export const Error = () => (
  <AlertWrapper Component={ErrorAlert} />
);


export const Warning = () => (
    <AlertWrapper Component={WarningAlert} />
  );