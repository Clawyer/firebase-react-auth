import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context/userContext";

import LeftPanel from "../../components/LeftPanel/LeftPanel";
import Tweet from "../../components/Tweet/Tweet";
import CreateTweet from "../../components/Tweet/CreateTweet";
import Loader from "../../components/Loader";
import "./home.sass";
export default function Home() {
  const {
    createTweet,
    setCreateTweet,
    currentUser,
    setCurrentUser,
    upload,
    setUpload,
  } = useContext(UserContext);

  const [validation, setValidation] = useState("");
  const [inputs, setInput] = useState("");
  const [tweetData, setTweetsData] = useState({});
  const [loading, isLoading] = useState(true);
  const [userTweets, setUserTweets] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/tweets")
      .then((res) => res.json())
      .then((data) => setTweetsData(data.Tweets))
      .then(getUser(currentUser.email))
      .catch((error) => {
        console.error(error.message);
        throw new Error();
      })
      .finally(() => {
        isLoading(false);
      });
  }, [createTweet, upload]);

  const tweets = loading
    ? "Loading..."
    : tweetData.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            message={tweet.text}
            createAt={tweet.createdAt}
            email={tweet.creatorUser.email}
            username={tweet.creatorUser.name}
          />
        );
      });

  const addInputs = (el) => {
    setInput(el);
  };
  const closeModal = () => {
    setValidation("");
    setCreateTweet(false);
  };

  const getUser = async (email) => {
    try {
      const email = currentUser.email;
      let res = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweet: {
            email: email,
          },
        }),
      });
      let resJson = await res.json();
      setCurrentUser((old) => ({
        ...old,
        name: resJson.user.name,
        url: resJson.user.avatar,
      }));
      return resJson;
    } catch (err) {
      console.log(err.message);
      throw new Error();
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // console.log(resJson);
      const email = currentUser.email;
      const text = inputs.value;
      const resJson = await getUser(email);
      setUserTweets(resJson.tweets);
      const user_id = resJson.user.id;
      try {
        let res = await fetch("http://localhost:3001/tweet/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tweet: {
              text: text,
              creator_id: user_id,
              email: email,
            },
          }),
        });
        closeModal();
        return await res.json();
      } catch (err) {
        console.log(err.message);
        throw new Error();
      }

      // navigate("/private/private-home");
    } catch (error) {
      console.log(error.message);
      setValidation("Email and/or password incorrect, try again !");
      throw new Error();
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          {createTweet && (
            <CreateTweet
              close={closeModal}
              addInputs={addInputs}
              validation={validation}
              handlecreate={handleCreate}
            />
          )}
          <LeftPanel
            url={currentUser.url}
            username={currentUser.name}
            email={currentUser.email}
          />
          <section className="twitter-flux">{!loading && tweets}</section>
        </div>
      )}
    </>
  );
}
