import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';

export const AdminRoute = ({ user, children }) => {
	if (user.role === 'user') {
		return <Navigate to='/home' replace />;
	}

	return children;
};
