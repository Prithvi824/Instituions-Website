import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function StudentTeacherTable({ data, count }) {
  // consist of classes and timming for table - 2
  const [table, setTable] = useState([]);

  // Days paired to the index value
  const days = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };

  useEffect(() => {
    // A sample array to hold filtered data
    let arr = [];

    // Loop to filter the slots which are not empty
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < data.length; row++) {
        let schedule = data[row][col];

        if (schedule.length === 2 && arr.length < count) {
          let element = {
            day: days[col],
            teacher: schedule[1],
            time: row + 2,
            subject: schedule[0],
          };
          arr.push(element);
        }
      }
    }

    // Update the Filtered Table
    setTable(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section className="w-screen mt-12 flex justify-center items-center mb-10">
      <div className="w-11/12 h-auto flex justify-start items-center bg-light_blue overflow-x-scroll ">
        <table className="student-teacher-table w-full">
          <thead className="merge-one text-lg">
            <tr className="">
              <th className="pt-5 ">Time</th>
              <th className="w-4/6 text-nowrap">Course And Teacher</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {table.map((val, key) => {
              return (
                <React.Fragment key={key}>
                  <tr>
                    <td>
                      <div className="pl-2 pr-2 pt-2 pb-1">
                        <h1>{val.day}</h1>
                        <p className="text-base -mt-2">{val.time}:00 PM</p>
                      </div>
                    </td>
                    <td className="text-nowrap merge-one">
                      {val.subject} By {val.teacher}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

StudentTeacherTable.propTypes = {
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
};

export default StudentTeacherTable;
