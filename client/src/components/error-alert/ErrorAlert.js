import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrorMessage } from "../../store/slices/error-slice";

const ErrorAlert = () => {
  const errorMessage = useSelector((state) => state.error.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 4000);
    }
  }, [errorMessage, dispatch]);

  if (!errorMessage) {
    return null;
  }

  return (
    <div className="error-alert-modal">
      <div className="error-alert-content">
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default ErrorAlert;
