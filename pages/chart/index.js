import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { CURRENT_MONTH_IND, MONTHS_RU, MONTHS_RU_SHORT } from "../../consts";
import useData from "@/services/useData";
import NoData from "@/components/NoData/NoData";
import SubTabs from "@/components/SubTabs/SubTabs";

const Chart = () => {
  const data = useSelector((state) => state.data);
  const { year, noEmptyCategories, colors } = useData();
  const expenses = data?.[year];

  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH_IND);

  if (!expenses) return <NoData />;

  const expenseInMonth = Object.entries(expenses[selectedMonth]).map(
    ([categoryId, value]) => {
      const category = noEmptyCategories.find(
        (caterory) => caterory.id === categoryId,
      );
      return { name: category.name, value, color: colors[category.id] };
    },
  );

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
