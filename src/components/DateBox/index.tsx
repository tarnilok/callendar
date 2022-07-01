import React, { useEffect, useState } from "react";
import "./styles.css";

interface DateBoxTypes {
  allDays: [];
  borderBottom: string;
  setDuration: (e: any) => void;
}

const DateBox = ({ allDays, borderBottom, setDuration }: DateBoxTypes) => {
  const [selected, setSelected]: any = useState({});

  useEffect(() => {
    setDuration(selected);
  }, [selected, setDuration]);
  const selectDay = (day: any, item: any) => {
    const { time } = item;
    setSelected(
      (selected[`${borderBottom}`]?.day === day &&
        selected[`${borderBottom}`]?.time === item.time) ||
        (selected[`${borderBottom}`]?.day === day &&
          selected[`${borderBottom}`]?.time === item.time)
        ? {
            ...selected,
            [`${borderBottom}`]: { ...selected[`${borderBottom}`], time: "", day: 0 },
          }
        : borderBottom === "CHECK-OUT"
        ? new Date(day + time) > new Date(selected["CHECK-IN"]?.day + selected["CHECK-IN"]?.time)
          ? {
              ...selected,
              [`${borderBottom}`]: { ...selected[`${borderBottom}`], time: time, day: day },
            }
          : selected
        : borderBottom === "CHECK-IN"
        ? new Date(day + time) <
          (selected["CHECK-OUT"]?.day
            ? new Date(selected["CHECK-OUT"]?.day + selected["CHECK-OUT"]?.time)
            : Infinity)
          ? {
              ...selected,
              [`${borderBottom}`]: { ...selected[`${borderBottom}`], time: time, day: day },
            }
          : selected
        : {
            ...selected,
            [`${borderBottom}`]: { ...selected[`${borderBottom}`], time: time, day: day },
          }
    );
  };
  return (
    <>
      {allDays.map((item: any) => (
        <React.Fragment key={item.time}>
          <div className="dateBox-title">{item.time}</div>
          <div
            className="allDays-container"
            style={{
              gridTemplateRows:
                [...item.prevDays, ...item.days, ...item.nextDays].length < 36
                  ? "repeat(5, 56px)"
                  : "repeat(6, 56px)",
            }}
          >
            {item.prevDays.map((prevDay: any, index: number) => (
              <div key={index} className="prevDays">
                {prevDay}
              </div>
            ))}
            {item.days.map((day: number, index: number) => (
              <div
                key={index}
                className={
                  (selected["CHECK-IN"]?.day === day && selected["CHECK-IN"]?.time === item.time) ||
                  (selected["CHECK-OUT"]?.day === day && selected["CHECK-OUT"]?.time === item.time)
                    ? "selectedCurrentDays"
                    : "currentDays"
                }
                style={{
                  color:
                    new Date().getDate() <= day
                      ? (selected["CHECK-IN"]?.day === day &&
                          selected["CHECK-IN"]?.time === item.time) ||
                        (selected["CHECK-OUT"]?.day === day &&
                          selected["CHECK-OUT"]?.time === item.time)
                        ? "#fff"
                        : "#1D1F22"
                      : "#8E8F90",
                }}
                onClick={() => selectDay(day, item)}
              >
                {day}
              </div>
            ))}
            {item.nextDays.map((nextDay: any, index: number) => (
              <div key={index} className="nextDays">
                {nextDay}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default DateBox;
