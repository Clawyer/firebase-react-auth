import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function SignUpModal() {
  const { toggleModals, modalState, signUp } = useContext(UserContext);
  const [validation, setValidation] = useState("");

  const navigate = useNavigate();

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    if (
      (inputs.current[2].value.length || inputs.current[3].value.length) < 6
      ) {
        setValidation("6 characters minimum required");
        return;
      } else if (inputs.current[2].value != inputs.current[3].value) {
        setValidation("Passwords do not match");
        return;
      }

    try {
      const username = inputs.current[0].value;
      const email = inputs.current[1].value;
      const pwd = inputs.current[2].value;
      const repwd = inputs.current[3].value;
      const dob =inputs.current[4].value;

      const cred = signUp(email, pwd);

      let res = await fetch("http://localhost:3001/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            pwd: pwd,
            name: username,
            dob: dob,
          },
        }),
      });

      let resJson = await res.json();

      formRef.current.reset();
      setValidation("");
      toggleModals("close");

      navigate("/private/private-home");
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/invalid-email") {
        setValidation("Email format is invalid");
      }
      if (error.code === "auth/email-already-in-use") {
        setValidation("Email already in use");
      }
      throw new Error();
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signUpModal && (
        <Modal
          sign="signUp"
          SignUp={true}
          btn="Sign Up"
          formRef={formRef}
          title="Create your account"
          close={closeModal}
          handleForm={handleForm}
          addInputs={addInputs}
          validation={validation}
        />
      )}
    </>
  );
}
