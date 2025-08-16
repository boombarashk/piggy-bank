import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { CURRENT_MONTH_IND, MONTHS_RU_SHORT } from "../../consts";
import useData from "@/services/useData";
import NoData from "@/components/NoData/NoData";
import SubTabs from "@/components/SubTabs/SubTabs";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const data = useSelector((state) => state.data);
  const { year, noEmptyCategories, colors } = useData();
  const expenses = data?.[year];

  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH_IND);

  if (!expenses) return <NoData />;

  const expenseInMonth = {
    labels: Object.keys(expenses[selectedMonth]).map(
      (categoryId) =>
        noEmptyCategories.find((caterory) => caterory.id === categoryId).name,
    ),
    datasets: [
      {
        data: Object.values(expenses[selectedMonth]),
        backgroundColor: Object.keys(expenses[selectedMonth]).map(
          (categoryId) => colors[categoryId],
        ), //fixme
      },
    ],
  };

  return (
    <>
      <SubTabs
        activeValue={selectedMonth}
        tabs={Object.keys(expenses).map((month) => ({
          value: month,
          text: MONTHS_RU_SHORT[month],
          handleClick: () => {
            setSelectedMonth(month);
          },
        }))}
      />

      <div id="chart" style={{ maxHeight: 360 }}>
        <Pie data={expenseInMonth} />
      </div>
    </>
  );
};

export default Chart;
