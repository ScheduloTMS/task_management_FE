import React, { useEffect } from "react";
import swal from "sweetalert";
import "./passwordUpdated.css";

const PasswordUpdatedModal = () => {
  useEffect(() => {
    swal({
      title: "Password Updated!",
      text: "Your password has been updated successfully.",
      icon: "success",
      buttons: false,
      content: {
        element: "div",
        attributes: {
          innerHTML:
            'Back to <a href="/loginPage" class="swal-login-link">log in</a>',
        },
      },
    });
  }, []);

  return null; 
};

export default PasswordUpdatedModal;
