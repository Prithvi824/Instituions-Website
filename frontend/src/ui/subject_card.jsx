import PropTypes from "prop-types";

function Subject({ sub, image, color }) {
  color = "#" + color;
  return (
    <div
      className="lg:w-11/12 lg:mt-6 pl-2 pt-2 pb-2 flex justify-center items-center gap-x-2 rounded-xl"
      style={{ backgroundColor: color }}
    >
      <div className="p-1 border-x-2 border-y rounded-lg border-white">
        <img src={image} alt={sub} />
      </div>
      <div className="pr-4">
        <h1 className="merge-one text-base">{sub}</h1>
        <p className="lg:text-lg lg:w-44 text-xs opacity-75 w-28 -mt-1">
          AT Oxzone classes we Teach {sub} for Class 11th and 12th
        </p>
      </div>
    </div>
  );
}

Subject.propTypes = {
  sub: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Subject;
