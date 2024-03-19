// React Imports
import { useState, useEffect } from "react";

// Routing Imports
import { useLocation, useNavigate } from "react-router-dom";

// Components Imports
import TeacherTimeTable from "../components/teacher_timetable";
import TeacherSchedule from "../components/teacher_schedule";
import TeacherNotes from "../components/teacher_notes";

// Authentication Imports
import useAuth from "../components/use_auth";

// Componenet
function Teacher() {
  // User object
  const { user } = useAuth();

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // Schedule for Teacher
  const [teacherSchedule, setTeacherSchedule] = useState(null);

  // Neccesarry hooks for Navigation
  const Location = useLocation();
  const Navigate = useNavigate();

  // Handles the first render
  useEffect(() => {
    // If the credentials does not match return to Homepage
    if (!("role" in user) || user.role !== "Teacher") return Navigate("/");

    // Fetch the Data relating to the Teacher
    async function fetchData(uniqueUser) {
      try {
        // Hit the Endpoint to fetch data
        let response = await fetch("http://192.168.1.7:5000/fetch", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id: uniqueUser.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }

        let result = await response.json();

        setTeacherSchedule(result.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    // Call the function to fetch Data for the current user
    fetchData(user);

    // Set the loading state to False
    setIsLoading(false);
  }, [Navigate, user]);

  // Load while the user is verified
  if (isLoading) {
    return <h1>Hello please wait while we validate the credentials</h1>;
  } else if (Location.pathname === "/teacher") {
    return (
      <>
        {/**The Time Table component for Teachers with the the timetable data */}
        <TeacherTimeTable timeTable={teacherSchedule || []} />
        {/**The Class - Table component for Teachers with
         * the timetable data, class count and fucntion to manipluate */}
        <TeacherSchedule
          timeTable={teacherSchedule || []}
          count={20}
          setTimeTable={setTeacherSchedule}
        />
      </>
    );
  } else if (Location.pathname === "/teacher/notes") {
    {
      /**Component to handle the upload note functionality */
    }
    return <TeacherNotes user={user} />;
  }
}

export default Teacher;
