import { Fragment, useEffect, useState, useCallback } from "react";
import image from "../images/pattern-divider-desktop.svg";
import imageMobile from "../images/pattern-divider-mobile.svg";
import dice from "../images/icon-dice.svg";
import classes from "./Advice.module.css";

const Advice = () => {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState("");

  const fetchData = useCallback(async () => {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setId(data.slip.id);
    setAdvice(data.slip.advice);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <p className={classes.title}>Advice #{id}</p>
      <p>"{advice}"</p>
      <img
        srcSet={`${image} 1440w, ${imageMobile} 375w`}
        sizes="(max-width:400px) 375px,
        1440px"
        src={image}
        alt=""
        className={classes.divider}
      />
      <button className={classes.btn} onClick={fetchData}>
        <img src={dice} alt="" className={classes.dice} />
      </button>
    </Fragment>
  );
};

export default Advice;
