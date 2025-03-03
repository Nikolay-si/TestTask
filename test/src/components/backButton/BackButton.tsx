import React from "react";
import Chevrone from "../../images/Interaction/Chevron.svg";
import styles from "./BackButton.module.css";

interface Props {
  onClick: () => void;
}

export const BackButton = ({ onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <img src={Chevrone} alt="chevrone" />
      <span className={styles.buttonText}>Back</span>
    </div>
  );
};
