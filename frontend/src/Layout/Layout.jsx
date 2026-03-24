// import { Link } from "react-router-dom";

// function Layout({ children }) {
//   return (
//     <div className="flex flex-col min-h-screen">

//       {/* Header */}
//       <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
//         <Link to="/" className="text-gray-700 hover:text-blue-600">
//             AI Healthcare
//         </Link>
//         <nav className="flex gap-6">
//           <Link to="/" className="text-gray-700 hover:text-blue-600">
//             Home
//           </Link>

//           <Link to="/login" className="text-gray-700 hover:text-blue-600">
//             Login
//           </Link>

//           <Link
//             to="/signup"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Sign Up
//           </Link>
//         </nav>
//       </header>

//       {/* Main Content (Children) */}
//         {children}

//       {/* Footer */}
//       <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
//         © 2026 AI Driven Healthcare System. All rights reserved.
//       </footer>

//     </div>
//   );
// }

// export default Layout;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../Redux/Slices/AuthSlice";
import { logout } from "../Redux/slices/authSlice";

function Layout({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔷 Header */}
      <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        {isLoggedIn ? (
          <Link
            to="/patients"
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
          >
            View All Patients
          </Link>
        ) : null}

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* 🔷 Main Content */}
      <main className="flex-grow">{children}</main>

      {/* 🔷 Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        <p>© 2026 AI Driven Healthcare System. All rights reserved.</p>

        <p className="mt-2 font-medium">Developed by:</p>

        <div className="mt-1 space-y-1">
          <p>
            MD RASHID ALAM, FARHAN ALI, GAURAV KUMAR GUPTA, ILMA PARVEEN, MD
            YUSUF AYUB
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
