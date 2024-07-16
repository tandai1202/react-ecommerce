import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({authData}) => {
    console.log(authData)
    if(!authData.isLoggedIn) {
        return <Navigate to="/login" replace></Navigate>
    }
    return <Outlet />;
}

ProtectedRoute.propTypes = {
    authData: PropTypes.object.isRequired
}

export default ProtectedRoute;