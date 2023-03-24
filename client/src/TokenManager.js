import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAdminToken, clearUserToken } from "./store/slices/auth-slice";

const TokenManager = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.userToken);
  const adminToken = useSelector((state) => state.auth.adminToken);

  useEffect(() => {
    // Check if the current page is the admin panel page
    const isAdminPanel = location.pathname.includes("/admin-panel");
    if (isAdminPanel && adminToken) {
      // Store the admin token in local storage
      localStorage.setItem("token", adminToken);
    } else if (!isAdminPanel && userToken) {
      // Store the user token in local storage for all other pages
      localStorage.setItem("token", userToken);
    } else {
      // Remove the token from local storage when not on the admin panel page or userToken is null
      localStorage.removeItem("token");
    }

    // Clean up the token from Redux store when not on the admin panel page
    if (!isAdminPanel) {
      dispatch(clearAdminToken());
    }
  }, [location.pathname, userToken, adminToken, dispatch]);

  return children;
};

export default TokenManager;
