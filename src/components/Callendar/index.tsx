import React, { useEffect, useState } from "react";

import { callendarHandler } from "../../utils/helper";
import Back from "../../assets/Back.svg";

import "./styles.css";
import Button from "../Button";
import DateBox from "../DateBox";
import { type } from "os";

const daysNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Callendar = () => {
  let [monthChanger, setMonthChanger] = useState(new Date().getMonth());
  const [borderBottom, setBorderBottom] = useState("CHECK-IN");
  const [allDays, setAllDays]: any = useState([]);
  const [duration, setDuration]: any = useState({});

  const durationAmount =
    duration["CHECK-OUT"]?.day !== 0 &&
    duration["CHECK-IN"]?.day !== 0 &&
    (+new Date(duration["CHECK-OUT"]?.day + duration["CHECK-OUT"]?.time) -
      +new Date(duration["CHECK-IN"]?.day + duration["CHECK-IN"]?.time)) /
      (1000 * 3600 * 24);

  useEffect(() => {
    if (monthChanger < 12) {
      const { time, days, prevDays, nextDays } = callendarHandler(monthChanger);
      const currentMonth: any = {
        month: monthChanger + 1,
        time: time,
        days: days,
        prevDays: prevDays,
        nextDays: nextDays,
      };
      setAllDays([...allDays, currentMonth]);
      setMonthChanger(monthChanger + 1);
    }
  }, [monthChanger, allDays]);

  return (
    <>
      <img src={Back} alt="Back_image" className="back" />
      <div className="title">DATES</div>
      <div className="check-container">
        {["CHECK-IN", "CHECK-OUT"].map((e) => (
          <React.Fragment key={e}>
            <div
              className="check-in-out"
              style={
                [e].includes(borderBottom)
                  ? { borderBottom: "1px solid #1D1F22" }
                  : { border: " none" }
              }
              onClick={() => setBorderBottom(e)}
            >
              {e}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="days-container">
        {daysNames.map((e) => (
          <React.Fragment key={e}>
            <div className="days-names">{e}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="datebox-container">
        <DateBox allDays={allDays} borderBottom={borderBottom} setDuration={setDuration} />
      </div>
      <Button
        text={
          durationAmount ? `CONTINUE - ${durationAmount} NIGHTS` : `SELECT ${borderBottom} DATE`
        }
        duration={duration}
        durationAmount={durationAmount}
      />
    </>
  );
};

export default Callendar;
