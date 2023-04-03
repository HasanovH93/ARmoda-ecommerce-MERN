import AddProduct from "./pages/AddProduct/AddProduct";
import Dashboard from "./pages/Dasboard/Dashboard";
import Login from "./pages/Login/Login";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const adminRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedRoute component={Dashboard} />,
    children: [
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/dashboard-login",
    element: <Login />,
  },
];

export default adminRoutes;
