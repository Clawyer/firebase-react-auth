import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, storage, storageRef } from "../../firebase-config";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";

import {
  home,
  explore,
  twitter,
  notifications,
  messages,
  bookmarks,
  lists,
  profile,
  more,
} from "./icons";
import "./leftPanel.sass";

const LeftPanel = (props) => {
  const { createTweet, setCreateTweet, currentUser, upload, setUpload } =
    useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.dir(err);
      alert("Error can't disconnect, please check your network connection");
      throw new Error();
    }
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  useEffect(() => {
    avatar && handleUpload();
  }, [avatar]);

  const handleUpload = () => {
    setUpload(true);
    const storageRef = ref(storage, `images/${currentUser.name}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          const email = currentUser.email;
          fetch("http://localhost:3001/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                email: email,
                url: downloadURL,
              },
            }),
          })
            .then((res) => res.json())
            .finally(() => {
              setUpload(false);
            });
        });
      }
    );
  };

  return (
    <div className="left-pane">
      <div className="container">
        <header>
          {twitter}

          <nav>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? "selected" : "")}
            >
              <span>{home} Home</span>
            </NavLink>
            <NavLink
              to="/explore"
              className={(navData) => (navData.isActive ? "selected" : "")}
            >
              <span>{explore} Explore</span>
            </NavLink>
            <NavLink
              to="/notifications"
              className={(navData) => (navData.isActive ? "selected" : "")}
            >
              <span>{notifications} Notifications</span>
            </NavLink>
            <NavLink
              to="/messages"
              className={(navData) => (navData.isActive ? "selected" : "")}
            >
              <span>{messages} Messages</span>
            </NavLink>
            <NavLink
              to="/bookmarks"
              className={(navData) => (navData.isActive ? "selected" : "")}
            >
              <span>{bookmarks} Bookmarks</span>
            </NavLink>
            <NavLink
              to="/lists"
              className={(navData) => (navData.isActive ? "selected" : "")}
            >
              <span>{lists} Lists</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={(navData) => (navData.isActive ? "selected" : "")}
            >
              <span>{profile} Profile</span>
            </NavLink>
            <button className="more">
              <span>{more} More</span>
            </button>
          </nav>

          <button
            onClick={() => setCreateTweet((old) => !old)}
            className="tweet-btn"
          >
            Tweet
          </button>
        </header>
        <footer>
          {/* {upload && <progress value={progress} max="100" />} */}
          <button onClick={() => handleUpload} className="account">
            <div className="photo">
              {!upload && (
                <label htmlFor="upload">
                  <img
                    className="pdp"
                    src={props.url || "https://fakeimg.pl/300/"}
                    alt="twitter profile"
                  ></img>
                  <input
                    type="file"
                    id="upload"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                  />
                </label>
              )}
            </div>

            <div>
              <div className="name">{props.username}</div>
              <div className="username">@{props.email}</div>
            </div>
          </button>
          <button className="logOut--btn" onClick={logout}>
            Log Out
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LeftPanel;
