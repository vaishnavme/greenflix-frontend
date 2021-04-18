import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({login, ...props}) => {
    return login ? <Route {...props}/> : <Navigate replace to="/login"/>;
}