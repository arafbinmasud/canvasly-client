import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import ErrorPage404 from "../pages/ErrorPage404";
import AddArtwork from "../pages/AddArtwork";
import PrivateRoute from "./PrivateRoute";
import ExploreArtworks from "../pages/ExploreArtworks";
import ArtDetails from "../pages/ArtDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register></Register>
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login></Login>
          </PublicRoute>
        ),
      },
      {
        path: "/add-artworks",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/explore-artworks",
        element: <ExploreArtworks/>
      },
      {
        path: "/artwork/:id",
        element:<PrivateRoute><ArtDetails/></PrivateRoute>
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage404></ErrorPage404>,
  },
]);

export default router;
