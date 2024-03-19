import React from "react";
import PropTypes from "prop-types";

function Fees({ fees }) {
  function handlebutton(e) {
    console.log(e);
  }

  return (
    <section className="w-screen  flex flex-col justify-center items-center mt-2">
      <div className="w-11/12 bg-light_pink flex justify-start rounded-xl drop-shadow-normal">
        <h1 className="merge-one text-xl p-2">Fees</h1>
      </div>

      {fees.map((details, key) => {
        return (
          <React.Fragment key={key}>
            <div className="w-11/12 flex justify-start items-center mt-6 mb-3 text-xl metro">
              <h1>Installment - {key + 1}</h1>
            </div>
            <div className="w-11/12 flex justify-center items-center mt-3 mb-3 border-black border-2 rounded-lg overflow-hidden border-r-0">
              <table className="w-full bg-light_peach fees-table">
                <thead className="merge-one text-lg">
                  <tr>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="merge-one">
                  <tr>
                    <td>₹ {details.amount}</td>
                    <td>₹ {details.paid}</td>
                    <td>₹ {details.due}</td>
                    <td>
                      <div>
                        <button
                          onClick={() => {
                            handlebutton(details.Due);
                          }}
                          className="bg-light_pink pl-4 pr-4 pt-1 pb-1 rounded-xl  border-black drop-shadow-normal"
                        >
                          Pay Now
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </React.Fragment>
        );
      })}
    </section>
  );
}

Fees.propTypes = {
  fees: PropTypes.array.isRequired,
};

export default Fees;
