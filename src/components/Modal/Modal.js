import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "./modal.sass";

function Modal(props) {

  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className="modal">
        <div className="modal--overlay" onClick={props.close}></div>
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={props.close}>X</button>
            <i>
              <img src="https://img.icons8.com/color/50/000000/twitter--v1.png"></img>
            </i>
          </div>
          <h2 className="modal--title">{props.title}</h2>
          <form
            ref={props.formRef}
            onSubmit={props.handleForm}
            className={`${props.sign}-form form`}
          >
            {props.SignUp && (
              <div className={`${props.sign}--username`}>
                <input
                  ref={props.addInputs}
                  className={`${props.sign}Username-input`}
                  type="text"
                  name="username"
                  placeholder="Username"
                  id={`${props.sign}Username`}
                  required
                />
              </div>
            )}
            <div className={`${props.sign}--email`}>
              <input
                ref={props.addInputs}
                className={`${props.sign}Email-input`}
                type="email"
                name="email"
                placeholder="email"
                id={`${props.sign}Email`}
                required
              />
            </div>
            <div className={`${props.sign}-pwd`}>
              <input
                ref={props.addInputs}
                className={`${props.sign}Password-input`}
                type="password"
                name="password"
                placeholder="password"
                id={`${props.sign}UpPassword`}
                required
              />
              {!props.SignUp && (
                <p className="validation">{props.validation}</p>
              )}
            </div>
            {props.SignUp && (
              <>
                <div className={`${props.sign}-RepPwd`}>
                  <input
                    ref={props.addInputs}
                    className={`${props.sign}Password-input`}
                    type="password"
                    name="password"
                    placeholder="Repeat password"
                    id={`${props.sign}RepPassword`}
                    required
                  />
                  <p className="validation">{props.validation}</p>
                </div>
                <h2 className="modal--title dob">Date of birth</h2>
                <span>
                  This will not be shown publicly. Confirm your own age, even if
                  this account is for a business, a pet, or something else.
                </span>

                <DatePicker onChange={onChange} value={value} />
                <input
                  ref={props.addInputs}
                  defaultValue={value}
                  className="hidden"
                />
              </>
            )}
            <button className="submit--btn">{props.btn}</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
