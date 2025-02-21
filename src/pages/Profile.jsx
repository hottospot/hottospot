import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { PageTitle } from "../layout/PageTitle";
import styles from "./Profile.module.scss";
// import { auth } from '../api/firebase';
import { auth } from "../firebase/api/firebase";
import defalutImg from "../../public/img/defalutIcon.png";
import { motion } from "framer-motion";
import { GradationButton } from "../layout/GradationButton";
import { red } from "@mui/material/colors";
import { Handle } from "vaul";
import FriendsModalSheet from "../components/friendsModalSheet/FriendsModalSheet";

const getUserInfo = () => {
  return auth.currentUser;
};

function Profile() {
  const user = getUserInfo();
  console.log(`user:${user}`);
  const [users, loading, error] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState("home");
  const handleClck = () => {
    return console.log("OK");
  };
  const friendsList = [
    {
      id: 1,
      name: "トマト",
      icon: "写真",
      like: 2,
      place: "香嵐渓",
      latitude: 35.1375,
      longitude: 137.2958,
    },
    {
      id: 2,
      name: "トマト",
      icon: "写真",
      like: 5,
      place: "犬山城",
      latitude: 35.3894,
      longitude: 136.9392,
    },
    {
      id: 3,
      name: "トマト",
      icon: "写真",
      like: 8,
      place: "岡崎城",
      latitude: 34.9546,
      longitude: 137.1608,
    },
  ];

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p>エラーが発生しました: {error.message}</p>;
  }

  return (
    <div>
      <div className={styles.pagetitle}>
        <PageTitle />
      </div>
      <div className={styles.upper}>
        <div className={styles.title}>プロフィール</div>
        <div className={styles.thing}>
          ランキングはリアルタイムで更新され、人気の変動もひと目で分かる。あなたのお気に入りの場所も、もしかしたらランクインしているかも？
          今、行くべきアツい場所を見つけよう！
        </div>
        <img
          src={user.photoURL || defalutImg}
          alt="user"
          className={styles.photo}
        />
        <p className={styles.username}>{user.displayName}</p>
        <p className={styles.email}>{user.email}</p>
        <div className={styles.codobutton}>
          <GradationButton color="red" onClick={handleClck}>
            フレンドコード
          </GradationButton>
        </div>
        <div className={styles.addbutton}>
          <GradationButton color="red" onClick={handleClck}>
            フレンド追加
          </GradationButton>
        </div>
        <div className={styles.friendslist}>フレンドリスト</div>
        <div className={styles.friendsList}>
          {friendsList.map((friendsList) => {
            return (
              <div className={styles.friendCard} key={friendsList.id}>
                <p>{friendsList.icon}</p>
                <p className={styles.name}>{friendsList.name}</p>
                <div className={styles.like}>
                  <svg
                    width="22"
                    height="26"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.00216662 7.24023C0.0169452 5.7343 0.496361 4.26967 1.3749 3.04647C2.25344 1.82327 3.48825 0.901186 4.91059 0.406212C6.33293 -0.0887621 7.87341 -0.132476 9.32153 0.281043C10.7696 0.694563 12.0548 1.54514 13.0013 2.71655C13.9678 1.52067 15.2868 0.659936 16.7706 0.256726C18.2545 -0.146483 19.8277 -0.0716449 21.2665 0.470601C22.7054 1.01285 23.9367 1.9949 24.7854 3.27713C25.6341 4.55937 26.0569 6.07651 25.9938 7.61287C25.8573 12.2362 22.4884 15.759 19.5918 17.9775C17.7914 19.3469 15.8475 20.5165 13.7942 21.4656C13.7494 21.4872 13.7133 21.5031 13.6859 21.5132L13.6555 21.5262L13.6469 21.5306H13.6425C13.4401 21.6179 13.222 21.6632 13.0015 21.6635C12.781 21.6639 12.5627 21.6194 12.36 21.5327H12.3556L12.347 21.5262L12.3145 21.5132C12.1453 21.4395 11.9777 21.3622 11.8118 21.2814C9.86958 20.3496 8.02906 19.2192 6.31972 17.9081C3.39059 15.642 0 12.0412 0 7.32256L0.00216662 7.24023Z"
                      fill="url(#paint0_linear_366_475)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_366_475"
                        x1="0"
                        y1="0"
                        x2="28.6797"
                        y2="4.46985"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F84F90" />
                        <stop offset="1" stopColor="#ED4B4B" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className={styles.number}>{friendsList.like}/10</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
