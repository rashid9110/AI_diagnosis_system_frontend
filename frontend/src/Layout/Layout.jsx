import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
            AI Healthcare
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content (Children) */}
        {children}
      

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        © 2026 AI Driven Healthcare System. All rights reserved.
      </footer>

    </div>
  );
}

export default Layout;
