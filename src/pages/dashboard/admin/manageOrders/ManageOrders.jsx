import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi'
import { Link } from 'react-router-dom';
import UpdateOrderModal from './UpdateOrderModal';
import { formatDate } from '../../../../utils/formatDate';


const ManageOrders = () => {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteOrder] = useDeleteOrderMutation();

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap();
            alert("Order deleted successfully");
            refetch();

        } catch (error) {
            console.error("Failed to delete order:", err);
        }
    }

    // if (isLoading) return <div>Loading....</div>
    // if (error) return <div>Something went wrong!</div>

    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-500 text-lg">Loading orders...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500 text-lg">
                Something went wrong while fetching orders.
            </div>
        );
    }

    // return (
    //     <div className='section__container p-6'>
    //         <h2 className='text-2xl font-semibold mb-4'>Manage Orders</h2>
    //         <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
    //             <thead className='bg-gray-100'>
    //                 <tr>
    //                     <th className='py-3 px-4 border-b'>Order Id</th>
    //                     <th className='py-3 px-4 border-b'>Customer</th>
    //                     <th className='py-3 px-4 border-b'>Status</th>
    //                     <th className='py-3 px-4 border-b'>Date</th>
    //                     <th className='py-3 px-4 border-b'>Actions</th>
    //                 </tr>
    //             </thead>

    //             <tbody>
    //                 {
    //                     orders && orders.map((order, index) => (
    //                         <tr key={index}>
    //                             <td className='py-3 px-4 border-b'>{order?.orderId}</td>
    //                             <td className='py-3 px-4 border-b'>{order?.email}</td>
    //                             <td className='py-3 px-4 border-b'>
    //                                 <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>{order?.status}</span>
    //                             </td>
    //                             <td className='py-3 px-4 border-b'>{formatDate(order?.updatedAt)}</td>
    //                             <td className='py-3 px-4 border-b flex items-center space-x-4'>
    //                                 <Link to='#' className="text-blue-500 hover:underline">View</Link>
    //                                 <button className="text-green-500 hover:underline" onClick={() => handleEditOrder(order)}>Edit</button>
    //                                 <button className="text-red-500 hover:underline" onClick={() => handleDeleteOrder(order?._id)}>Delete</button>
    //                             </td>
    //                         </tr>
    //                     ))
    //                 }
    //             </tbody>
    //         </table>

    //         {/* update order modal */}
    //         {
    //             selectedOrder && (
    //                 <UpdateOrderModal
    //                     order={selectedOrder}
    //                     isOpen={isModalOpen}
    //                     onClose={handleCloseModal}
    //                 />
    //             )
    //         }
    //     </div>
    // )

    return (
        <div className="section__container p-4 sm:p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Orders</h2>

            <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
                        <tr>
                            <th className="px-6 py-4 text-left">Order ID</th>
                            <th className="px-6 py-4 text-left">Customer</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders?.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={order._id || index} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">{order?.orderId || `#${index + 1}`}</td>
                                    <td className="px-6 py-4">{order?.email}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full text-white ${getStatusColor(
                                                order?.status
                                            )}`}
                                        >
                                            {capitalize(order?.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{formatDate(order?.updatedAt)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                to="#"
                                                className="text-blue-600 hover:text-blue-800 font-medium transition"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => handleEditOrder(order)}
                                                className="text-green-600 hover:text-green-800 font-medium transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order?._id)}
                                                className="text-red-600 hover:text-red-800 font-medium transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Order Modal */}
            {isModalOpen && selectedOrder && (
                <UpdateOrderModal
                    order={selectedOrder}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};


// Capitalize status text
const capitalize = (text) =>
    text?.charAt(0).toUpperCase() + text?.slice(1);

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-green-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-300';
    }
};

export default ManageOrders