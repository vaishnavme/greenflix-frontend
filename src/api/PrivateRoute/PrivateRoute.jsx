import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context";

export const PrivateRoute = ({path, ...props}) => {
    const { user } = useAuth();
    return user ? <Route {...props}/> : <Navigate replace to="/login"/>;
}