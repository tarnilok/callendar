import React from "react";
import "./styles.css";

interface ButtonTypes {
  text: string;
  duration: {};
  durationAmount: number | boolean;
}

const Button = ({ text, duration, durationAmount }: ButtonTypes) => {
  return (
    <>
      <button className="callendar-button" onClick={() => console.log(duration, durationAmount)}>
        {text}
      </button>
      ;<div className="line"></div>
    </>
  );
};

export default Button;
