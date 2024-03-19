// Important Imports
import React, { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import useAuth from "./use_auth";

function TeacherSchedule({ timeTable, count, setTimeTable }) {
  // User Instacne
  let { user } = useAuth();

  // consist of classes and timming for table - 2
  const [table, setTable] = useState([]);

  // handles the time selection for the Select new Time
  const [time, setTime] = useState({});

  // handles the time selection for the Select Old Time
  const [oldTime, setOldTime] = useState({});

  // for the pop up to change classes
  const [isChanging, setIsChanging] = useState(false);

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

  // Handles the render of the table whenever the data is updated
  useEffect(() => {
    // A sample array to hold filtered data
    let arr = [];

    // Loop to filter the slots which are not empty
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < timeTable.length; row++) {
        let schedule = timeTable[row][col];

        if (
          typeof schedule === "string" &&
          schedule.length > 1 &&
          arr.length < count
        ) {
          let element = {
            day: days[col],
            time: row + 2,
            schedule: schedule,
          };
          arr.push(element);
        }
      }
    }

    // Update the Filtered Table
    setTable(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeTable]);

  // Handles the Selection in the Select
  function HandleSelect(option) {
    setTime({ ...time, time: option.value });
  }

  // Handles the Pop up and Old time
  function handleScheduleChange(time, day, batch) {
    setOldTime({ day: day, time: time, batch: batch });
    setTime({ day: day, time: time, batch: batch });
    setIsChanging(true);
  }

  // Function to send update to the server
  async function sendUpdate(batch, newRow, Col, oldRow, id) {
    try {
      let response = await fetch("http://192.168.1.7:5000/update", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          batch: batch,
          newRow: newRow,
          col: Col,
          oldRow: oldRow,
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to put data in the server");
      }
    } catch (e) {
      console.log("Error happened: ", e);
    }
  }

  // Function to handle and update the data change
  function HandleForm(e) {
    e.preventDefault();

    // Find the index of the day in the days object
    let day_ind = Object.entries(days).findIndex(
      (value) => value[1].toLowerCase() === oldTime.day.toLowerCase()
    );

    // Find the row corresponding to the new time
    const newRow = time.time - 2;

    // Old Row
    let oldRow = oldTime.time - 2;

    // If the time hasn't changed, no need to update
    if (oldTime.time === time.time || timeTable[newRow][day_ind] != "-") {
      window.alert("Please select a Empty slot");
      setIsChanging(false);
      return;
    }

    // Create a new copy of timeTable to avoid mutating the state directly
    const updatedTimeTable = [...timeTable];

    // Delete the old batch
    updatedTimeTable[oldRow][day_ind] = "-";

    // Update the batch for the specified day and time
    updatedTimeTable[newRow][day_ind] = time.batch;

    // Update the Data on the Server
    sendUpdate(time.batch, newRow, day_ind, oldRow, user.id);

    // Update the state with the new timeTable
    setTimeTable(updatedTimeTable);

    // Turn off the pop up
    setIsChanging(false);
  }

  // Select Options
  const options = [
    { value: "2", label: "2:00 Pm" },
    { value: "3", label: "3:00 Pm" },
    { value: "4", label: "4:00 Pm" },
    { value: "5", label: "5:00 Pm" },
    { value: "6", label: "6:00 Pm" },
    { value: "7", label: "7:00 Pm" },
    { value: "8", label: "8:00 Pm" },
    { value: "9", label: "9:00 Pm" },
  ];

  // Select Styles
  const customStyles = {
    control: (provided, state) => ({
      // Custom styling for the control (dropdown container)
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      backdropFilter: "blur(5px)",
      border: state.isFocused ? "2px solid blue" : "2px solid black",
      borderRadius: "8px",
      marginTop: "4px",
    }),
    option: (provided, state) => ({
      // Custom styling for options
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  return (
    <>
      <section className="w-screen mt-12 flex justify-center items-center mb-10">
        <div className="w-11/12 h-auto flex justify-start items-center bg-light_blue overflow-x-scroll ">
          <table className="student-teacher-table w-full">
            <thead className="merge-one text-lg">
              <tr className="">
                <th className="w-1/6 pt-5 ">Time</th>
                <th className="w-3/6 text-nowrap">Batch</th>
                <th className="w-1/6 text-nowrap">Change</th>
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
                      <td className="text-nowrap merge-one">{val.schedule}</td>
                      <td className="text-nowrap merge-one p-4">
                        <button
                          onClick={() =>
                            handleScheduleChange(
                              val.time,
                              val.day,
                              val.schedule
                            )
                          }
                          className=" bg-light_pink pl-2 pr-2 rounded-xl drop-shadow-normal"
                        >
                          Change
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div
        className="fixed top-0 left-0 w-lvw h-lvh flex justify-center items-center backdrop-blur-sm"
        style={{ display: isChanging ? "flex" : "none" }}
      >
        <div className="w-80 p-8 bg-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-xl border-2 border-black drop-shadow-normal">
          <div
            onClick={() => setIsChanging(false)}
            className="absolute top-4 right-4"
          >
            <img
              width={"25px"}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+klEQVR4nO2aT4hNURzHP4y89xQzI8yzoEzJzsLCCjtljOHZmpkFsTYMZWVjx6SUJEn+FGX59DLMygaJLIQxg4QZxUtsZHgcnfpNnV73/Tv3d9+9XvOtX93u+/X9ne+7v/M7v3PuhTm0LpYCOWAEKADjwFdgRsxev5TfTolvJwlBGhgExoA/gGnQSsAdYEC4mo4McASY9hh8JbNcw8LdFOwA3ioKKLc3QG+UAuyjPxOhgHK7CizSFrESeNpEEUbsMZDVEtEtj9vEZK9lDKGwApiIUYRx5o33k8nElE6mgj3xLdEXEjB4U2bnfEqsSaj1NJJScU5uU8fkryvFjiZgsKaGHaolIgVMJWCgpoZ9qtXKDHoSP3ce98E6/K+L7wLgoWfM/mpCxkL8S7Y1t5gP3Kvi9xlYLr7HQ8QbrbafKIUgtm38JuFaC/yo4LdLfDYAv0LEKwEdQUJ2K+Su7YoXC9/hgN+vOHPxmUK8nUFCRhSI3UWrDbjv3J9ydoSnlWKdDBJSUCL/6yxa65wU2y73NnvuJk2A5YOEaDaH7538tevSJbluB94pxhkPElJUDODOhzanNF9WjvElSMiMchC3QmkVE1NmP5shxM6DLQ7/3mYJKSoHsZVpdvWeJ9f5ZqTWhGKAF04vZPc1B+Q6K8EjnewFJfLfwEbh3Crl+DuwWu7lFIXko1wQTwifLb8fy3qj2RS7EeWCmFMgtnv8hcJ3LeD3/Y7IDwrx+oKEdIZsGm0FWV/jT/kGrBKfXoUUbqcC7oYgPiYcy2TjU8lvzEmxiyHi3aYKBjxJH8gKbnGzDv994rskRMuypxW2utP1HEAMJ2CgpoYN0QLHQZONnDiGrShR2jYaxPkEDNqU2Vk8kJb3EyYh9kiKkRfssc2rhByTdhES3UIUp4g1KCEr7yfiSKculJGK4WVohgjRE3GqTfqUWF+k5Whfs52xXENxfQGRkkZz1HMLUJIutj9MadVGh5zF2l3bLfmApuh8VFOUe3nx6au2n5gD/zn+AatBHYsrLw5uAAAAAElFTkSuQmCC"
            />
          </div>
          <div className="pb-8">
            <h1 className="metro text-2xl mb-6 ml-1">Select a Time</h1>
            <form onSubmit={HandleForm}>
              <label htmlFor="Time" className="metro text-lg ml-1">
                Choose a Slot
              </label>
              <Select
                options={options}
                styles={customStyles}
                placeholder={"Select a Time..."}
                onChange={HandleSelect}
                value={{ label: `${time.time}: 00 Pm`, value: time.time }}
              />
              <div className="w-full flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className="pl-6 pr-6 pt-2 pb-1 bg-light_green rounded-lg drop-shadow-normal"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Props Declaration
TeacherSchedule.propTypes = {
  timeTable: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  setTimeTable: PropTypes.func.isRequired,
};

export default TeacherSchedule;
