// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import CreateTrip from "./pages/CreateTrip";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Default page */}
//         <Route
//           path="/"
//           element={<Navigate to="/login" replace />}
//         />

//         {/* Public pages */}
//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* Protected page */}
//         <Route element={<ProtectedRoute />}>
//           <Route
//             path="/dashboard"
//             element={<Dashboard />}
//           />
//         </Route>

//         {/* Invalid URL */}
//         <Route
//           path="*"
//           element={<Navigate to="/login" replace />}
//         />
//         <Route element={<ProtectedRoute />}>
//   <Route path="/dashboard" element={<Dashboard />} />
//   <Route path="/create-trip" element={<CreateTrip />} />
// </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import CreateTrip from "./pages/CreateTrip";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Default page */}
//         <Route
//           path="/"
//           element={<Navigate to="/login" replace />}
//         />

//         {/* Public pages */}
//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* Protected pages */}
//         <Route element={<ProtectedRoute />}>
//           <Route
//             path="/dashboard"
//             element={<Dashboard />}
//           />

//           <Route
//             path="/create-trip"
//             element={<CreateTrip />}
//           />
//         </Route>

//         {/* Invalid URL */}
//         <Route
//           path="*"
//           element={<Navigate to="/login" replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Default Page */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* Public Pages */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Pages */}

        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* Create Trip */}
          <Route
            path="/create-trip"
            element={<CreateTrip />}
          />


          {/* Edit Trip */}
          <Route
            path="/edit-trip/:id"
            element={<EditTrip />}
          />

        </Route>


        {/* Invalid URL */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;