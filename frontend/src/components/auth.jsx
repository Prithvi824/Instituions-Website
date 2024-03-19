import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const Authorize = createContext(null);

function Authenticator({ children }) {
  const [user, setUser] = useState({});

  const [timetable, setTimeTable ] = useState({})

  async function login(element) {
    let user = element.target[0].value;
    let pass = element.target[1].value;

    let response = await fetch("http://192.168.1.7:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user, password: pass }),
    });

    let result = await response.json();

    return result;
  }

  return (
    <Authorize.Provider value={{ login, user, setUser, timetable, setTimeTable }}>
      {children}
    </Authorize.Provider>
  );
}

Authenticator.propTypes = {
  children: PropTypes.node,
};

export default Authenticator;
