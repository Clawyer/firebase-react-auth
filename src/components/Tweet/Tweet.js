import React from "react";
import ReactDOM from "react-dom";
import Username from "./components/Username";
import "./tweet.sass";

export default function Tweet(props) {
  const Time = () => <span className="time">{props.createAt}</span>;
  const Reply = () => <i className="fa fa-reply reply-button" />;
  const RetweetButton = () => <i className="fa fa-retweet retweet-button" />;
  const LikeButton = () => <i className="fa fa-heart like-button" />;
  const MoreOPtionsButton = () => (
    <i className="fa fa-ellipsis-h more-options-button" />
  );

  return (
    <div className="tweet">
      <div className="content">
        <div className="box-top">
          <Username username={props.username} email={props.email} /> <Time />
        </div>
        <div className="message">{props.message}</div>
        <div className="buttons">
          <Reply />
          <RetweetButton />
          <LikeButton />
          <MoreOPtionsButton />
        </div>
      </div>
    </div>
  );
}
