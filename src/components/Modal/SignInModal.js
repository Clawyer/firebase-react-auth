import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"
import "./modal.sass";

export default function SignInModal() {
  const { toggleModals, modalState, signIn } = useContext(UserContext);
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
    try {
      const email = inputs.current[0].value;
      const pwd = inputs.current[1].value;
      console.log(email, pwd)
      const cred = await signIn(email, pwd);
      formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch (error) {
      console.log(error.message);
      setValidation("Email and/or password incorrect, try again !");
      throw new Error();
    }
  };
  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
        <Modal
          sign="signIn"
          btn="Log In"
          title="Sign In to Twitter"
          SignUp={false}
          formRef={formRef}
          close={closeModal}
          handleForm={handleForm}
          addInputs={addInputs}
          validation={validation}
        />
      )}
    </>
  );
}
