import React from "react";
import Image from "next/image";
import Loader from "../Loader/Loader";

interface INoDataProps {
  text?: string;
  loading?: boolean;
}

const NoData = ({
  text = "Нет данных",
  loading = false,
}: INoDataProps): React.ReactElement => (
  <>
    {loading && <Loader />}
    {!loading && (
      <Image src="/no-data.png" alt={text} width={128} height={128} />
    )}
  </>
);

export default NoData;
