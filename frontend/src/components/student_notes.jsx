import React from "react";
import PropTypes from "prop-types";

function StudentNotes({ notes }) {
  // Subject list
  let subjects = Object.keys(notes);

  // Function to handle download functionality
  function handlebutton(e) {
    window.location = e
  }

  return (
    <section className="w-screen  flex flex-col justify-center items-center mt-2">
      <div className="w-11/12 bg-light_pink flex justify-start rounded-xl drop-shadow-normal">
        <h1 className="merge-one text-xl p-2">Notes</h1>
      </div>

      {subjects.length > 0
        ? subjects.map((sub, index) => {
            return (
              <React.Fragment key={index}>
                <div className="w-11/12 flex justify-start items-center mt-6 text-xl metro">
                  <h1>{sub}</h1>
                </div>
                <div className="w-11/12 flex justify-center items-center mt-3 border-black border-2 rounded-lg overflow-hidden border-r-0">
                  <table className="w-full bg-light_peach notes-table">
                    <thead className="merge-one text-lg">
                      <tr>
                        <th className="w-4/6">Chapter</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="merge-one">
                      {
                        // notes contains topic in a object with its link accessible through sub an link respectively
                        notes[sub].map((topic, sub_index) => {
                          return (
                            <React.Fragment key={sub_index}>
                              <tr>
                                <td>{topic.topic.split('.')[0]}</td>
                                <td>
                                  <div>
                                    <button
                                      onClick={() => handlebutton(topic.link)}
                                      className="bg-light_pink pl-4 pr-4 pt-1 pb-1 rounded-xl border-black drop-shadow-normal"
                                    >
                                      Download
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </React.Fragment>
            );
          })
        : "-"}
    </section>
  );
}

StudentNotes.propTypes = {
  notes: PropTypes.object.isRequired,
};

export default StudentNotes;
