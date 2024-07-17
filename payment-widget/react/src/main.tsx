import ReactDOM from "react-dom/client";
import { CheckoutPage } from "./pages/Checkout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SuccessPage } from "./pages/Success";
import { FailPage } from "./pages/Fail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
