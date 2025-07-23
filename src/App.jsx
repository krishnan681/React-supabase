// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import DirectoryPage from './pages/DirectoryPage';
// import Login from './pages/Auth/Login';
// import Signup from './pages/Auth/Signup';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<DirectoryPage />} /> */}
//         <Route path="/" element={<Login />} />
//         <Route path="/" element={<Signup />} />

//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import DirectoryPage from "./pages/DirectoryPage";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <div style={{ paddingTop: "80px" }}>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/LandingPage" element={<LandingPage />} />
//           <Route path="/directory" element={<DirectoryPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ remove BrowserRouter
import Navbar from "./Components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import DirectoryPage from "./pages/DirectoryPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
