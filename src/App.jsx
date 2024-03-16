import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const fetchRandomData = async (pageNumber) => {
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => {
      console.log(JSON.stringify(data));
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const getFullUserName = (userInfo) => {
  const {
    name: { first, last },
  } = userInfo;
  return `${first} ${last}`;
};

export default function App() {
  const [randomUserData, setRandomUserData] = useState("");
  const [userInfos, setUserInfos] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
      // setRandomUserData(JSON.stringify(randomData, null, 2) || "No user data");
      if (randomData === undefined) return;
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };

  useEffect(() => {
    //fetchNextUser
    fetchNextUser();
    // fetchRandomData(nextPageNumber).then((randomData) => {
    // setRandomUserData(JSON.stringify(randomData, null, 2) || "No user data");
    // setUserInfos(randomData.results);
    // setNextPageNumber(randomData.page.info + 1);
    // });
  }, []);

  return (
    <>
      <h2>Random Data</h2>
      <button onClick={fetchNextUser}>Fetch Next User</button>
      {userInfos.map((userInfo, index) => (
        <>
          <div>
            <p key={index}>{getFullUserName(userInfo)}</p>
            <img src={userInfo.picture.thumbnail} />
          </div>
        </>
      ))}
      {/* <pre>{randomUserData}</pre> */}
    </>
  );
}
