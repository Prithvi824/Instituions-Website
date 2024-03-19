import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./layout";
import Index from "./pages/index";
import Student from "./pages/student";
import Teacher from "./pages/teacher";
import Error from "./components/error";

import Authenticator from "./components/auth";

import "../node_modules/primereact/resources/themes/lara-light-indigo/theme.css";
import "./global.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route path="" element={<Index />} />
      <Route path="/student/*" element={<Student />} />
      <Route path="/teacher/*" element={<Teacher />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authenticator>
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </Authenticator>
  </React.StrictMode>
);
