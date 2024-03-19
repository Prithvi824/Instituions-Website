// Prop Type Imports
import PropTypes from "prop-types";

function TeacherTimeTable({ timeTable }) {
  // While the data is not fetched or is empty return blank
  if (timeTable.length === 0) {
    timeTable = Array(8).fill(Array(7).fill("-"));
  }
  return (
    <section className="w-screen mt-3 flex justify-center items-center">
      <div className="w-11/12 h-auto flex justify-start items-center bg-light_peach overflow-x-scroll ">
        <table className="teacher-time-table">
          <thead className="merge-one text-lg lg:text-xl">
            <tr className="">
              <th className="">Timming</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2:00 PM</td>
              {timeTable[0].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
            <tr>
              <td>3:00 PM</td>
              {timeTable[1].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
            <tr>
              <td>4:00 PM</td>
              {timeTable[2].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
            <tr>
              <td>5:00 PM</td>
              {timeTable[3].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
            <tr>
              <td>6:00 PM</td>
              {timeTable[4].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
            <tr>
              <td>7:00 PM</td>
              {timeTable[5].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
            <tr>
              <td>8:00 PM</td>
              {timeTable[6].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
            <tr>
              <td>9:00 PM</td>
              {timeTable[7].map((val, key) => {
                return <td key={key}>{val}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

TeacherTimeTable.propTypes = {
  timeTable: PropTypes.array.isRequired,
};

export default TeacherTimeTable;
