import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./components/authComponents/Register";
import Login from "./components/authComponents/Login";
import Home from "./components/Home";
import TripDetails from "./components/TripDetails";
import PastTrips from "./components/PastTrips";
import ExplorePage from "./components/ExplorePage";
import DestinationPage from "./components/DestinationPage";
import Profile from "./components/Profile";
import { useAuth } from "./auth/useAuth";
import AuthButtons from "./components/authComponents/AuthButtons";
import ProtectedRoute from "./components/authComponents/ProtectedRoute";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear session or token here
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      {/* Main header */}
      <h1 style={{ textAlign: "left" }}>Smart Itinerary App</h1>
      {!isLoggedIn ? (
        <header id="main-header">
          <nav>
            <AuthButtons />
          </nav>
        </header>
      ) : (
        <>
          <nav id="loggedin-header">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/past-trips" className="nav-link">
              Past Trips
            </Link>
            <Link to="/explore" className="nav-link">
              Explore
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Button
              style={{ marginLeft: "auto", color: "white" }}
              onClick={handleLogout}
              className="nav-link"
            >
              Logout
            </Button>
          </nav>
        </>
      )}

      {/* Main content */}
      <main style={{ padding: "16px" }}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip-details/:id"
            element={
              <ProtectedRoute>
                <TripDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/past-trips"
            element={
              <ProtectedRoute>
                <PastTrips />
              </ProtectedRoute>
            }
          />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/destination/:id" element={<DestinationPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
