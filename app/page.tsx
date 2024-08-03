import React from "react";
import Hero from "../components/hero";
import styles from "../styles/hero.module.scss";
import { NAME } from "lib/data";
import { Center } from "@mantine/core";
import { Vizualiser } from "components/Vizualiser";

export default function Page() {
  return (
    <>
      <Vizualiser />
      <Center
        h={"100%"}
        component="article"
        id="home"
        className={`${styles.container}`}
      >
        <Hero name={NAME} />
      </Center>
    </>
  );
}
