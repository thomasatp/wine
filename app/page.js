"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const player = useRef(null);

  useEffect(
    function subscribeToWheelEvent() {
      const updateScroll = function (e) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const progressX = Math.round((e.clientX / width) * 100);
        const progressY = Math.round((e.clientY / height) * 100);
        setPosition({
          x: progressX >= 50 ? progressX - 50 : -50 + progressX,
          y: progressY >= 50 ? progressY - 50 : -50 + progressY,
        });
        setPos({ x: progressX, y: progressY });
        player.current.setSeeker(((progressX + progressY) / 200) * 125);
        // player.current.setPlayerSpeed(progressX / 5);
      };
      window.addEventListener("mousemove", updateScroll);

      return function () {
        window.removeEventListener("mousemove", updateScroll);
      };
    },
    [position]
  );

  return (
    <main className={styles.main}>
      <h3 className={styles.xCoords}>
        {`47° 49' ${(0.01 * pos.x + 0.05).toFixed(2)}"`}
      </h3>
      <h3 className={styles.yCoords}>
        {`0° 34' ${(0.01 * pos.y + 0.05).toFixed(2)}"`}
      </h3>
      <div
        className={styles.center}
        style={{
          transform: `translateX(${-position.x}%) translateY(${
            -position.y / 2
          }%)`,
        }}
      >
        <Player
          ref={player}
          autoplay
          loop
          src="https://lottie.host/88b44092-94a6-421f-b01a-cf862a5cff28/9lPb9BYkDf.json"
          style={{
            height: "400px",
            width: "400px",
          }}
        ></Player>
        <h1 className={styles.title}>MATÈRE</h1>
      </div>
    </main>
  );
}
