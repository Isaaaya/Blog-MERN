import { useState } from "react";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Articles",
      url: "/articles",
    },
    {
      name: "Pages",
      url: "/pages",
    },
    {
      name: "Pricing",
      url: "/pricing",
    },
    {
      name: "FAQ",
      url: "/faq",
    },
  ];

  const [navIsVisible, setNavIsVisible] = useState(false);
  const handleMenuButton = () => {
    if (!navIsVisible) {
      setNavIsVisible(true);
    } else setNavIsVisible(false);
  };

  return (
    <nav className="h-[80px] flex items-center w-[80%] mx-auto justify-between lg:text-lg">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <button
        onClick={handleMenuButton}
        className={`md:hidden z-20 ${navIsVisible && "fixed"} right-8`}
      >
        {!navIsVisible ? <FiMenu size={25} /> : <MdClose size={25} />}
      </button>
      <div
        className={`${
          navIsVisible ? "right-0" : "-right-full"
        } transition-all duration-300 bg-white md:bg-transparent z-10 flex flex-col w-full md:w-auto justify-start md:flex-row fixed top-0 bottom-0 md:static gap-6 md:gap-8 items-center py-[70px]`}
      >
        {navLinks.map((link) => (
          <Link key={link.name} to={link.url}>
            <button
              onClick={() => setNavIsVisible(false)}
              className="relative group max-md:text-xl  max-md:border-b-2 py-1"
            >
              {link.name}
              <span className="cursor-pointer text-primary absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[105%] opacity-0 group-hover:opacity-100">
                /
              </span>
            </button>
          </Link>
        ))}
        <Link to="/auth/register">
          <button className="border-[2.5px] px-6 py-[3px] rounded-full border-primary text-primary font-semibold">
            Sign in
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
