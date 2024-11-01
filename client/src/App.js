// src/App.js

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminEmployeeLanding from "./components/AdminEmployeeLanding";
// import CustomerLanding from "./components/CustomerLanding";
// import CustomerLogin from "./components/CustomerLogin";
// import EmployeeLogin from "./components/EmployeeLogin";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route set to CustomerLogin */}
//         <Route path="/" element={<CustomerLogin />} />
//         <Route path="/admin" element={<AdminEmployeeLanding />} />
//         <Route path="/customer" element={<CustomerLanding />} />
//         <Route path="/employee-login" element={<EmployeeLogin />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLogin from "./components/CustomerLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
