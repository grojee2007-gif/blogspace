import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

const user = JSON.parse(
localStorage.getItem("blogUser")
);

if (!user?.token) {

return <Navigate to="/" />;

}

return children;

}

export default ProtectedRoute;