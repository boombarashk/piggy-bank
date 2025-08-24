import React from "react";
import Image from "next/image";

interface INoDataProps {
  text?: string;
}

const NoData = ({ text = "Нет данных" }: INoDataProps): React.ReactElement => (
  <div>
    <Image src="/no-data.png" alt={text} width={128} height={128} />
  </div>
);

export default NoData;
