import PropTypes from "prop-types";

function StudentTimeTable({ data }) {
  return (
    <section className="w-screen mt-3 flex justify-center items-center">
      <div className="w-11/12 h-auto flex justify-start items-center bg-light_peach overflow-x-scroll ">
        <table className="student-time-table">
          <thead className="merge-one text-lg ">
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
              {data[0].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
            <tr>
              <td>3:00 PM</td>
              {data[1].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
            <tr>
              <td>4:00 PM</td>
              {data[2].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
            <tr>
              <td>5:00 PM</td>
              {data[3].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
            <tr>
              <td>6:00 PM</td>
              {data[4].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
            <tr>
              <td>7:00 PM</td>
              {data[5].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
            <tr>
              <td>8:00 PM</td>
              {data[6].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
            <tr>
              <td>9:00 PM</td>
              {data[7].map((val, key) => {
                return (
                  <td key={key}>{typeof val === String ? val : val[0]}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

StudentTimeTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default StudentTimeTable;
