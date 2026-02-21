import { Navigate } from 'react-router-dom';

// A wrapper component that strictly verifies the admin token BEFORE rendering the dashboard
export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('adminToken');

    // If no token exists at all, instantly kick them back to login page
    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    // Otherwise, allow React to try loading the Dashboard
    return children;
}
