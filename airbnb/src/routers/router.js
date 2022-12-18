import ErrorBoundary from "../components/ErrorBoundary";
import { createBrowserRouter } from "react-router-dom";
import Notfound from "../components/Notfound";
import RootLayout from "../components/RootLayout";
import Auth from "../module/Auth/Auth";
import LogIn from "../module/Auth/LogIn";
import Register from "../module/Auth/Register";
import Home from "../module/Home/Home";
import InfoUser from "../module/UserInfo";
import UserProtected from "./UserProtected";
import RoomListByLocation from "../module/RoomListByLocation";
import RoomDetail from "../module/RoomDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Home
      {path: "", element: <Home />},

      // List room by location
      {path: "/location/:id",element: <RoomListByLocation />},

      // Detail room
      {path: "/room/:id", element: <RoomDetail />},
      
      // Auth
      {
        path: "",
        element: <Auth />,
        children: [
          { path: "/login", element: <LogIn /> },
          { path: "/register", element: <Register /> },
        ],
      },
      
      // User Information
      {
        path: "/user/:id",
        element: (
          <UserProtected>
            <InfoUser />
          </UserProtected>
        ),
      },
    ],
  },

  { path: "*", element: <Notfound /> },
]);

export default routes;
