import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
