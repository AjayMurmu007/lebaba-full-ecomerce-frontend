// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'
// import UserDashboard from './UserDashboard';
// import AdminDashboard from './AdminDashboard';

// const DashboardLayout = () => {
//     const { user } = useSelector((state) => state.auth);
//     if (!user) {
//         return <Navigate to="/login" replace />
//     }

//     const renderDashboard = () => {
//         switch (user?.role) {
//             case 'admin':

//                 return <AdminDashboard />;
//             case 'user':
//                 return <UserDashboard />;

//             default:
//                 return <Navigate to="/login" replace />;
//         }
//     }



//     return (
//         <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
//             <header className='lg:w-1/5 sm:w-2/5 w-full border'>
//                 {renderDashboard()}
//             </header>
//             <main className='p-8 bg-white w-full border mt-5'>
//                 <Outlet />
//             </main>

//         </div>
//     )
// }

// export default DashboardLayout

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const renderDashboard = () => {

        const dashboardProps = {
            onLinkClick: () => setSidebarOpen(false), // This will close the sidebar
        };

        switch (user?.role) {
            case 'admin':
                return <AdminDashboard {...dashboardProps} />;
            case 'user':
                return <UserDashboard {...dashboardProps} />;
            default:
                return <Navigate to="/login" replace />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Toggle button for mobile */}
            <button
                className="md:hidden p-4 bg-blue-600 text-white"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? 'Close Menu' : 'Open Menu'}
            </button>

            {/* <button
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle Menu"
            >
                {sidebarOpen ? (
                    // Close Icon (X)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // Hamburger Icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button> */}


            {/* Sidebar */}
            <aside
                className={`bg-gray-100 border-r w-64 p-4 fixed md:static top-0 left-0 h-full z-40 transform transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:w-1/4 lg:w-1/5`}
            >
                {renderDashboard()}
            </aside>

            {/* Overlay when sidebar is open on mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 bg-white md:ml-8 mt-4 md:mt-0 md:pl-0 h-full overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
