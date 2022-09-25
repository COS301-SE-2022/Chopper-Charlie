import { Navigate } from 'react-router-dom';


export const AdminRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to='/login' replace />;
    }
	if (user.role === 'user') {
		return <Navigate to='/home' replace />;
	}
	return children;
};

export const PrivateRoute = ({ user, children }) => {
	if (!user) {
		return <Navigate to='/login' replace />;
	}
	return children;
};