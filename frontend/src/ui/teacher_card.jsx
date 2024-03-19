import PropTypes from "prop-types";

function Teacher_card({ image, name, subject, description, background }) {
  return (
    <div
      className="md:flex-row  flex flex-col justify-center items-center p-3 w-11/12 mt-6 rounded-xl drop-shadow-normal"
      style={{ backgroundColor: background }}
    >
      <div>
        <img
          src={image}
          alt={subject}
          className="mt-2 md:pr-2 md:mt-0 md:h-36"
        />
      </div>
      <div className="w-11/12 mt-2">
        <div className="metro">
          <h1 className="text-2xl">{name}</h1>
          <p className="text-base opacity-75 -mt-1">{subject}</p>
        </div>
        <p className="metro mt-3 opacity-7 ">{description}</p>
      </div>
    </div>
  );
}

Teacher_card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};

export default Teacher_card;
