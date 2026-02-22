import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
      <main className="flex flex-col flex-1">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Root;
