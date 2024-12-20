import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import React from "react";
import UserProfile from "./components/UserProfile";
import Payment from "./components/Payment";
import Return from "./components/Return"; // Import the Return component

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/menu/:resid",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/checkout", // Add the checkout route
        element: <Payment />,
      },
      {
        path: "/return", // Add the return route
        element: <Return />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
