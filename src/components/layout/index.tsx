import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen dynamic bg-primary text-white">
      <Nav />
      <ToastContainer />
      <main className="grid flex-1 p-4 mt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
