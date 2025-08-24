import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAppDispatch } from "../../store";
import { DEFAULT_COLORS } from "../../consts";
import useClickOutside from "@/services/useClickOutside";
import {
  setColorByIndex,
  saveCategories,
} from "@/services/reducers/categories";
import { TCategory } from "../../types";

import styles from "./DefinitionList.module.css";

interface IDefinitionListProps {
  data: TCategory[];
}

const DefinitionList = ({
  data = [],
}: IDefinitionListProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const picker = useRef<HTMLDivElement | null>(null);

  const [pickerIndex, setPickerIndex] = useState<number>();
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  const closePicker = useCallback(() => {
    dispatch(saveCategories({ data }));
    setPickerVisible(false);
  }, [dispatch, data]);
  useClickOutside(picker, closePicker);

  return (
    <>
      <div className={styles.list}>
        {data.map((item, index) => {
          const bgColor =
            item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

          return (
            <dl key={item.id}>
              <dt>
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
            </dl>
          );
        })}
      </div>

      {pickerVisible && pickerIndex && (
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

export default DefinitionList;
