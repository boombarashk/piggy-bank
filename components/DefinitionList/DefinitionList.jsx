import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { HexColorPicker } from "react-colorful";

import { DEFAULT_COLORS } from "../../consts";
import useClickOutside from "@/services/useClickOutside";
import {
  setColorByIndex,
  saveCategories,
} from "@/services/reducers/categories";

import styles from "./DefinitionList.module.css";

const DefinitionList = ({ data = [] }) => {
  const dispatch = useDispatch();
  const picker = useRef();

  const [pickerIndex, setPickerIndex] = useState();
  const [pickerVisible, setPickerVisible] = useState(false);

  const closePicker = useCallback(() => {
    dispatch(saveCategories({ data }));
    setPickerVisible(false);
  }, [data]);
  useClickOutside(picker, closePicker);

  return (
    <>
      <dl className={styles.list}>
        {data.map((item, index) => {
          const bgColor =
            item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

          return (
            <>
              <dt key={item.id}>
                <div
                  className={styles.mark}
                  style={{ backgroundColor: bgColor }}
                  onClick={() => {
                    setPickerIndex(index);
                    setPickerVisible(true);
                  }}
                />
              </dt>
              <dd key={index}>{item.name}</dd>
            </>
          );
        })}
      </dl>

      {pickerVisible && (
        <div ref={picker} className={styles.picker}>
          <HexColorPicker
            color={DEFAULT_COLORS[pickerIndex % DEFAULT_COLORS.length]}
            onChange={(newColor) =>
              dispatch(setColorByIndex({ index: pickerIndex, color: newColor }))
            }
          />
        </div>
      )}
    </>
  );
};

DefinitionList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
    }),
  ).isRequired,
};

export default DefinitionList;
