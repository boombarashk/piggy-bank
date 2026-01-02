"use client";
import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useAppDispatch, useYearSelector } from "../../store";
import useData from "@/services/useData";
import { setYear } from "@/services/reducers/options";
import Button from "../Button/Button";
import styles from "./Aside.module.css";

const Aside = () => {
  const selectedYear = useSelector(useYearSelector);
  const { years } = useData();
  const dispatch = useAppDispatch();

  if (Number(years?.length) < 2) return null;

  return (
    <aside className={styles.aside}>
      {years?.map((year) => (
        <div key={year}>
          <Button
            text={year}
            outlined={selectedYear !== year}
            className={classNames({
              [styles.current]: selectedYear === year,
            })}
            clickHandler={() => {
              dispatch(setYear(year));
            }}
          />
        </div>
      ))}
    </aside>
  );
};

export default Aside;
