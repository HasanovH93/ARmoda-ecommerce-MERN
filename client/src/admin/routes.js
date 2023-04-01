import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";

const adminRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "add-product", element: <AddProduct /> },
    ],
  },
  {
    path: "/dashboard-login",
    element: <Login />,
  },
];

export default adminRoutes;
