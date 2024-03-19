import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import Nav from "./components/nav";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
