import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MONTHS_RU } from "../consts";
import useData from "@/services/useData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function HomePage() {
  const { year, byMonths, colors } = useData();

  if (!byMonths) return null;

  const preparedData = {
    labels: MONTHS_RU.filter((_, ind) =>
      Object.keys(byMonths).includes(`${ind}`),
    ),
    datasets: [
      {
        label: "Расходы за текущий год",
        data: Object.values(byMonths),
        //backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar data={preparedData} />;
}

export default HomePage;
