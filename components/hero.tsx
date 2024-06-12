"use client";
import { useMouseInput } from "hooks/useMouseInput";
import styles from "../styles/hero.module.scss";
import Navbar from "./navbar";
// import BaseSelect from "./select/base-select";

export default function Hero({ name }: { name: string }) {
  useMouseInput();
  return (
    <div className={styles.hero}>
      <h1 id="name">{name}</h1>
      <Navbar segment="home" />
      {/* <BaseSelect /> */}
    </div>
  );
}
