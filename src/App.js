import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import PublicRoute from "./routes/PublicRoute.jsx";
import NotFound from "./routes/NotFound.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/country/:code"
          element={
            <PrivateRoute>
              <CountryDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
