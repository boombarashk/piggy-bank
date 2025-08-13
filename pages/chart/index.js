import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { DEFAULT_COLORS, CURRENT_MONTH_IND, MONTHS_RU } from "../../consts";
import useData from "@/services/useData";
import NoData from "@/components/NoData/NoData";

const Chart = () => {
  const data = useSelector((state) => state.data);
  const { year, noEmptyCategories, colors } = useData();
  const expenses = data?.[year];

  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH_IND);

  if (!expenses) return <NoData />;

  const expenseInMonth = Object.entries(expenses[selectedMonth]).map(
    ([categoryId, value]) => {
      const category = noEmptyCategories.filter(
        (caterory) => caterory.id === categoryId,
      )[0];
      return { name: category.name, value, color: colors[category.id] };
    },
  );
  console.log(expenseInMonth);
  return (
    <>
      <h1>{MONTHS_RU[selectedMonth]}</h1>
      <div id="chart" className="tab-content">
        <PieChart width={800} height={400}>
          <Pie
            data={expenseInMonth}
            cy={200}
            labelLine={false}
            label={({ name }) => name}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value">
            {expenseInMonth.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </>
  );
};

export default Chart;
