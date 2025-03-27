
import React, { useEffect } from "react";
import swal from "sweetalert";
import "./Alert.css";

const Alert = ({ 
  title = "", 
  message = "", 
  icon = null, 
  buttons = false,
  dangerMode = false,
  onConfirm,
  onCancel,
  ...props 
}) => {
  useEffect(() => {
    swal({
      title,
      content: {
        element: "div",
        attributes: {
          innerHTML: message,
        },
      },
      icon: icon || undefined,
      buttons: buttons,
      dangerMode: dangerMode,
      ...props 
    }).then((value) => {
      if (value && onConfirm) onConfirm();
      if (value === null && onCancel) onCancel();
    });
  }, [title, message, icon, buttons, dangerMode, onConfirm, onCancel, props]);

  return null;
};

export default Alert;