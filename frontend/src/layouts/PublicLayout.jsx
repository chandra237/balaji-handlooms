import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PublicLayout({ showAuthModal }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar showAuthModal={showAuthModal} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;