import React from "react";
// import "./modal.sass";

export default function CreateTweet(props) {
  return (
    <>
      <div className="modal">
        <div className="modal--overlay" onClick={props.close}></div>
        <div className="modalContainer">
          <div className="titleCloseBtn " id="create--close">
            <button onClick={props.close}>X</button>
          </div>
          <textarea
            ref={props.addInputs}
            name="tweet"
            id=""
            cols="30"
            rows="10"
            defaultValue="What's happening?"
          ></textarea>
          <button
            id="tweet-create"
            onClick={props.handlecreate}
            className="submit--btn "
          >
            Tweet
          </button>
        </div>
      </div>
    </>
  );
}
