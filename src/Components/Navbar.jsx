import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Css/Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userData, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Logged out", "You have been logged out successfully.", "success");
        navigate("/login");
      }
    });
  };

  return (
    <nav className="glass-navbar navbar navbar-expand-lg navbar-dark bg-transparent px-4 position-absolute top-0 start-50 translate-middle-x mt-3">
      <Link className="navbar-brand fw-bold text-dark" to="/LandingPage">
        📘 PhonebookApp
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav me-3">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/contact">
              Contact
            </Link>
          </li>
        </ul>

        <div className="d-flex">
          {userData ? (
            <>
              <span className="me-3 fw-bold text-dark">
                👤 {userData.person_name || userData.business_name}
              </span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import Swal from "sweetalert2";
// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { userData, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to log out?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//       cancelButtonText: "Cancel",
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         Swal.fire("Logged out", "You have been logged out successfully.", "success");
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       {/* ...your navbar content here... */}
//       <div className="d-flex">
//         {userData ? (
//           <>
//             <span className="me-3 fw-bold text-dark">
//               👤 {userData.person_name || userData.business_name}
//             </span>
//             <button className="btn btn-danger" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link className="btn btn-primary me-2" to="/login">Login</Link>
//             <Link className="btn btn-success" to="/signup">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
