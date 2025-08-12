import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MONTHS_RU } from "../../consts";
import { addExpense, getData, saveData } from "@/services/reducers/data";
import Button from "@/components/Button/Button";
import NoData from "@/components/NoData/NoData";

import styles from "./Data.module.css";

function Expenses() {
  const monthRef = useRef();
  const categoryRef = useRef();
  const sumRef = useRef();

  const data = useSelector((state) => state.data);
  const categories = useSelector((state) => state.categories.data);

  const year = `${new Date().getFullYear()}`;
  const expenses = data?.[year];
  const yearsCount = (!!expenses && Object.keys(data).length) || 0;
  const monthsCount =
    (yearsCount > 0 && !!expenses && Object.keys(expenses).length) || 0;
  const currentMonthInd = `${new Date().getMonth()}`;

  const dispatch = useDispatch();
  //TODO filter categories no empty data
  useEffect(() => {
    dispatch(getData());
  }, []);

  // Сохранениие данных в файл
  const handleSave = useCallback(() => {
    //todo check sumRef valid
    const newData = addExpense({
      data,
      year,
      month: monthRef.current.value,
      categoryId: categoryRef.current.value,
      sum: sumRef.current.value,
    });
    dispatch(saveData(newData));
  }, [data, year]);

  const [disableBtn, setDisableBtn] = useState(true);
  const checkDisableBtn = () =>
    setDisableBtn(
      !categoryRef.current?.value ||
        !sumRef.current ||
        sumRef.current?.value <= 0,
    );

  return (
    <>
      {(!expenses || yearsCount === 0) && <NoData />}

      <div id="expenses" className="tab-content active">
        <form className={styles.expense_form}>
          <label htmlFor="selectorCategory">Внести расход за</label>
          <select
            name="month"
            className={styles.select}
            ref={monthRef}
            defaultValue={currentMonthInd}>
            {MONTHS_RU.map((month, ind) => (
              <option key={month} value={`${ind}`}>
                {month.toLowerCase()}
              </option>
            ))}
          </select>

          <select
            ref={categoryRef}
            name="category"
            className={styles.select}
            id="selectorCategory"
            defaultValue=""
            onChange={checkDisableBtn}>
            <option value="" disabled>
              Выбрать категорию
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <input
            ref={sumRef}
            name="expense"
            type="number"
            placeholder="Сумма"
            className={styles.input}
            step=".01"
            onChange={checkDisableBtn}
          />

          <Button
            additionClassName="ok-button"
            onClick={handleSave}
            disabled={disableBtn}
          />
        </form>

        {/*JSON.stringify(categories)*/}

        {yearsCount > 0 && monthsCount > 0 && (
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `240px repeat(${monthsCount}, 1fr)`,
            }}>
            <div className={styles.header}>Категории</div>
            {Object.keys(expenses).map((monthInd) => (
              <div className={styles.header} key={monthInd}>
                {MONTHS_RU[monthInd]}
              </div>
            ))}

            {categories.map((category) => (
              <>
                <div className={styles.cell}>{category.name}</div>
                {Object.keys(expenses).map((monthInd) => (
                  <div
                    className={styles.cell}
                    key={`${category.id}-${monthInd}`}>
                    {expenses?.[monthInd]?.[category.id]}
                  </div>
                ))}
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Expenses;
