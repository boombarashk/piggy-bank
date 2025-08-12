import Image from "next/image";
import PropTypes from "prop-types";

const NoData = ({ text = "Нет данных" }) => {
  return (
    <div>
      <Image src="/no-data.png" alt={text} width={128} height={128} />
    </div>
  );
};
NoData.propTypes = {
  text: PropTypes.string,
};

export default NoData;
