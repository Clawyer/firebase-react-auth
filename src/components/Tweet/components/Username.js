import React from "react";

export default function Username(props) {
  return (
    <span className="name-with-handle">
      <span className="name">{props.username}</span>
      <span className="handle">@{props.email}</span>
    </span>
  );
}

;
