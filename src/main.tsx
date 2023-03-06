import React from "react";
import ReactDOM from "react-dom/client";
import { CheckoutPage } from "./pages/Checkout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SuccessPage } from "./pages/Success";
import { FailPage } from "./pages/Fail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CheckoutPage />,
  },
  {
    path: "success",
    element: <SuccessPage />,
  },
  {
    path: "fail",
    element: <FailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
