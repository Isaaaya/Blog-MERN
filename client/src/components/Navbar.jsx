import { useState } from "react";
import Logo from "../assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import useAxiosFunction from "../hooks/useAxiosFunction";
import { toggleButton } from "../utils";
import { navLinks } from "../constants";

const Navbar = () => {
  const [logoutAxiosFetch, response, loading] = useAxiosFunction();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleLogout = async () => {
    await logoutAxiosFetch({
      method: "POST",
      url: `/auth/logout`,
    });
    dispatch(logout());
    navigate("/");
    toggleButton(isNavOpen, setIsNavOpen);
  };

  return (
    <nav className="h-[80px] flex items-center w-[80%] mx-auto justify-between lg:text-lg">
      <Link to="/">
        <img loading={"lazy"} src={Logo} alt="Logo" />
      </Link>
      <button
        onClick={() => toggleButton(isNavOpen, setIsNavOpen)}
        className={`md:hidden z-20 ${isNavOpen && "fixed"} right-8`}
      >
        {!isNavOpen ? <FiMenu size={25} /> : <MdClose size={25} />}
      </button>
      <div
        className={`${
          isNavOpen ? "right-0" : "-right-full"
        } transition-all duration-300 bg-white md:bg-transparent z-10 flex flex-col w-full md:w-auto justify-start md:flex-row fixed top-0 bottom-0 md:static gap-6 md:gap-8 items-center py-[70px]`}
      >
        {user && (
          <Link to="/articles/create">
            <button
              onClick={() => setIsNavOpen(false)}
              className="text-primary hover:border-b-2 border-primary font-semibold"
            >
              Create Article
            </button>
          </Link>
        )}
        {navLinks.map((link) => (
          <Link key={link.name} to={link.url}>
            <button
              onClick={() => setIsNavOpen(false)}
              className="relative group max-md:text-xl  max-md:border-b-2 py-1"
            >
              {link.name}
              <span className="cursor-pointer text-primary absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[105%] opacity-0 group-hover:opacity-100">
                /
              </span>
            </button>
          </Link>
        ))}
        {!user ? (
          <Link to="/auth/login">
            <button
              onClick={() => setIsNavOpen(false)}
              className="border-[2.5px] px-6 py-[3px] rounded-full border-primary text-primary font-semibold"
            >
              Sign in
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <div
              className="flex flex-col relative"
              onMouseOver={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <button className="border-[2.5px] px-6 py-[3px] rounded-full border-primary text-primary font-semibold">
                Profile
              </button>
              {isUserDropdownOpen && (
                <div className="absolute bottom-[-98px] lg:bottom-[-110px] left-[-13px] border rounded-md bg-white shadow-md text-center w-[130px]">
                  <Link to="/profile">
                    <button
                      onClick={() => setIsNavOpen(false)}
                      className="hover:bg-gray-200 w-[100%] py-1"
                    >
                      My Profile
                    </button>
                  </Link>
                  <Link to="/profile/articles">
                    <button
                      onClick={() => setIsNavOpen(false)}
                      className="hover:bg-gray-200 w-[100%] py-1"
                    >
                      My Articles
                    </button>
                  </Link>
                  <button
                    disabled={loading}
                    onClick={handleLogout}
                    className="px-6 w-[100%] py-1 text-primary font-semibold hover:bg-gray-200 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Log out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
