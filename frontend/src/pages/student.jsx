// Core React imports
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Student Components
import Fees from "../components/fees";
import StudentNotes from "../components/student_notes";
import StudentTimeTable from "../components/student_timetable";
import StudentTeacherTable from "../components/student_teachers_info";

// Authentication import
import useAuth from "../components/use_auth";

function Student() {
  // user instance
  const { user } = useAuth();

  // Create a Loading state while validating
  const [isLoading, setIsLoading] = useState(true);

  //timetable state
  const [timeTable, setTimeTable] = useState(
    Array.from({ length: 8 }, () => Array(7).fill("-"))
  );

  // Notes state
  const [notesData, setNotesData] = useState({});

  //Fees state
  const [feesData, setFeesData] = useState([]);

  // Hooks to handle navigation
  const Location = useLocation();
  const Navigate = useNavigate();

  // first time render and fetch data
  useEffect(() => {
    // validate the user
    if (!("role" in user) || user.role !== "Student") return Navigate("/");
    setIsLoading(false);

    //fetch the data from the server
    fetch("http://192.168.1.7:5000/fetch", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((result) => {
        setTimeTable(result.data);
        setNotesData(result.notesData);
        setFeesData(result.feesData);
      });

    // fetch the details about Fees
  }, [Navigate, user]);

  if (isLoading) {
    return <h1>Wait While we verify</h1>;
  } else {
    if (Location.pathname === "/student/fees") {
      return (
        <>
          <Fees fees={feesData} />
        </>
      );
    } else if (Location.pathname === "/student/notes") {
      return (
        <>
          <StudentNotes notes={notesData} />
        </>
      );
    } else if (Location.pathname === "/student") {
      return (
        <>
          <StudentTimeTable data={timeTable} />
          <StudentTeacherTable data={timeTable} count={20} />
        </>
      );
    } else {
      return <h1>Some error occured</h1>;
    }
  }
}

export default Student;
