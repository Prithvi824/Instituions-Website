import { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useLocation, useNavigate, Link } from "react-router-dom";

import Btn_1 from "../ui/button_1";
import useAuth from "./use_auth";

function Nav() {
  // login function and user
  const { login, setUser } = useAuth();

  // Login state
  const [isLogged, setIsLogged] = useState(false);

  //hook to handle navigation
  const Location = useLocation();
  const Navigation = useNavigate();

  // State and function to handle nav bar in and out
  const [isEnter, setIsEnter] = useState(false);
  function handlenavclick() {
    setIsEnter((prev) => !prev);
  }

  // State to handle the inner text of Nav bar
  const [DATA, setDATA] = useState(["Home", "Courses", "Admission"]);

  function fetchNavData() {
    //Nav bar details
    const home = [
      { val: "Home", route: "/" },
    ];

    const child = [
      { val: "Fees", route: "/student/fees" },
      { val: "Classes", route: "/student" },
      { val: "Notes", route: "/student/notes" },
    ];

    const teacher = [
      { val: "Classes", route: "/teacher" },
      { val: "Upload Notes", route: "/teacher/notes" },
    ];

    if (Location.pathname.startsWith("/student")) {
      setDATA(child);
    } else if (Location.pathname.startsWith("/teacher")) {
      setDATA(teacher);
    } else {
      setDATA(home);
    }
  }

  useEffect(() => {
    fetchNavData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Location.pathname]);

  // handles the nav bar menu clicks
  function buttonhandler(e) {
    Navigation(e);
  }

  // state and function to handle login popup
  const [isLoging, setIsLogging] = useState(false);
  function handlelogin() {
    setIsLogging((v) => !v);
  }

  // handles the scroll out of popups
  useEffect(() => {
    function handlescroll() {
      if (isEnter) {
        setIsEnter(false);
      }
    }

    window.addEventListener("scroll", handlescroll);

    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  });

  // Handles Login Form
  async function handleform(e) {
    e.preventDefault();

    let result = await login(e);

    console.log(
      "Authorization result: ",
      "role" in result ? "Authorized as " + result.role : "Failed to Authorize"
    );

    if ("role" in result) {
      setIsLogging(false);
      setIsLogged(true);
      setUser({ userName: result.user, role: result.role, id: result.id });
      Navigation(`/${result.role.toLowerCase()}`);
    }
  }

  // Refrence Hook
  const noderef = useRef(null);

  return (
    <>
      <nav className="w-full p-4 relative">
        <ul className="flex justify-between items-center">
          <Link to={"/"}>
            <li className="merge-one text-2xl">Oxzon</li>
          </Link>

          <li>
            <div className="flex justify-center items-center gap-x-6">
              <div style={{ display: `${!isLogged ? "block" : "none"}` }}>
                <div
                  style={{ display: `${isLoging ? "none" : "block"}` }}
                  onClick={handlelogin}
                >
                  <Btn_1 text="Log in" />
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="50"
                viewBox="0 0 50 50"
                onClick={handlenavclick}
              >
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
              </svg>
            </div>
          </li>
        </ul>
        <CSSTransition
          nodeRef={noderef}
          in={isEnter}
          timeout={1000}
          classNames="nav"
        >
          <div
            className="w-lvw h-lvh z-20 absolute top-0 left-0 duration-1000 transition-transform nav"
            onClick={handlenavclick}
            ref={noderef}
          >
            <div className="relative">
              <div className="w-9/12 h-lvh bg-[rgba(255,255,255,0.5)] backdrop-blur-sm border-black border-2 rounded-l-lg rounded-b-lg absolute top-0 right-0 z-30">
                <ul className="w-full h-full flex flex-col justify-center items-center text-3xl merge-one gap-y-2">
                  {DATA.map((item, key) => {
                    return (
                      <li key={key} onClick={() => buttonhandler(item.route)}>
                        {item.val}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={isLoging}
          nodeRef={noderef}
          timeout={10000}
          mountOnEnter
          unmountOnExit
        >
          <div
            className="w-lvw h-lvh flex justify-center items-center absolute top-0 left-0 z-50 backdrop-blur-sm"
            style={{ display: isLoging ? "flex" : "none" }}
          >
            <div className="lg:h-3/6 lg:w-3/12 md:w-6/12 md:h-2/6 md:text-lg bg-[rgba(255,255,255,0.25)] rounded-xl border-black border-2 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.5)] relative">
              <div onClick={handlelogin} className="absolute top-4 right-4">
                <img
                  width={"25px"}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+klEQVR4nO2aT4hNURzHP4y89xQzI8yzoEzJzsLCCjtljOHZmpkFsTYMZWVjx6SUJEn+FGX59DLMygaJLIQxg4QZxUtsZHgcnfpNnV73/Tv3d9+9XvOtX93u+/X9ne+7v/M7v3PuhTm0LpYCOWAEKADjwFdgRsxev5TfTolvJwlBGhgExoA/gGnQSsAdYEC4mo4McASY9hh8JbNcw8LdFOwA3ioKKLc3QG+UAuyjPxOhgHK7CizSFrESeNpEEUbsMZDVEtEtj9vEZK9lDKGwApiIUYRx5o33k8nElE6mgj3xLdEXEjB4U2bnfEqsSaj1NJJScU5uU8fkryvFjiZgsKaGHaolIgVMJWCgpoZ9qtXKDHoSP3ce98E6/K+L7wLgoWfM/mpCxkL8S7Y1t5gP3Kvi9xlYLr7HQ8QbrbafKIUgtm38JuFaC/yo4LdLfDYAv0LEKwEdQUJ2K+Su7YoXC9/hgN+vOHPxmUK8nUFCRhSI3UWrDbjv3J9ydoSnlWKdDBJSUCL/6yxa65wU2y73NnvuJk2A5YOEaDaH7538tevSJbluB94pxhkPElJUDODOhzanNF9WjvElSMiMchC3QmkVE1NmP5shxM6DLQ7/3mYJKSoHsZVpdvWeJ9f5ZqTWhGKAF04vZPc1B+Q6K8EjnewFJfLfwEbh3Crl+DuwWu7lFIXko1wQTwifLb8fy3qj2RS7EeWCmFMgtnv8hcJ3LeD3/Y7IDwrx+oKEdIZsGm0FWV/jT/kGrBKfXoUUbqcC7oYgPiYcy2TjU8lvzEmxiyHi3aYKBjxJH8gKbnGzDv994rskRMuypxW2utP1HEAMJ2CgpoYN0QLHQZONnDiGrShR2jYaxPkEDNqU2Vk8kJb3EyYh9kiKkRfssc2rhByTdhES3UIUp4g1KCEr7yfiSKculJGK4WVohgjRE3GqTfqUWF+k5Whfs52xXENxfQGRkkZz1HMLUJIutj9MadVGh5zF2l3bLfmApuh8VFOUe3nx6au2n5gD/zn+AatBHYsrLw5uAAAAAElFTkSuQmCC"
                />
              </div>
              <form
                onSubmit={handleform}
                className="flex justify-start flex-col p-6 lg:gap-y-4"
              >
                <label
                  htmlFor="username"
                  className="merge-one text-xl md:text-2xl font-semibold mt-2"
                >
                  User name
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username.."
                  className="merge-one pl-2 pt-1 w-11/12 rounded-lg outline-black"
                  required
                />

                <label
                  htmlFor="password"
                  className="merge-one text-xl md:text-2xl font-semibold mt-3"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password.."
                  className="merge-one pl-2 pt-1 w-11/12 rounded-lg outline-black"
                  required
                />
                <div className="w-full flex justify-center items-center mt-4">
                  <button
                    type="submit"
                    className="merge-one font-semibold md:text-2xl text-xl rounded-xl flex justify-center items-center pl-8 pr-8 pt-1 pb-1 bg-peach w-fit h-fit drop-shadow-normal"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </CSSTransition>
      </nav>
    </>
  );
}

export default Nav;
