import PropTypes from "prop-types";

function Btn_1({ text = "Log in" }) {
  return (
    <button className="merge-one text-lg rounded-xl border-solid border-black border-2 pl-4 pr-4 pt-1 pb-1">
      {text}
    </button>
  );
}

Btn_1.propTypes = {
  text: PropTypes.string,
};

export default Btn_1;
