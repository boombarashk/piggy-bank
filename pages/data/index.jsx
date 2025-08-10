import Button from "@/components/Button/Button";
import DataManager from "@/components/DataManager";

function Expenses() {
  return (
    <>
      <DataManager />

      <div id="expenses" className="tab-content active">
        <form className="expense-form">
          <select className="select">
            <option value="" disabled selected>
              Выберите категорию
            </option>
            <option value="category1">Категория 1</option>
            <option value="category2">Категория 2</option>
          </select>
          <input type="number" placeholder="Сумма" className="input-number" />

          <Button className="ok-button" />
        </form>

        <table className="expense-table">
          <thead>
            <tr>
              <th>Категории</th>
              <th>Январь</th>
              <th>Февраль</th>
              <th>Март</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Категория 1</td>
              <td>1 000</td>
              <td>2 000</td>
              <td>3 000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Expenses;
