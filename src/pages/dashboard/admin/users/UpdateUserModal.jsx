import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);

    const [updateUerRole] = useUpdateUserRoleMutation()
    const handleUpdateRole = async () => {
        try {
            await updateUerRole({ userId: user?._id, role }).unwrap();
            alert('Updated role successfully!')
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to update user role", error);
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
            <div className='bg-white rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/3 max-h-[90vh] overflow-y-auto p-6'>
                <h2 className='text-xl font-semibold mb-6'>Edit User Role</h2>
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type="email"
                        value={user?.email}
                        readOnly
                        className='mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    />
                </div>
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='block w-full shadow-sm sm:text-sm bg-gray-100 border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className='flex justify-end pt-5'>
                    <button
                        onClick={onClose}
                        className="bg-primary text-white px-4 py-2 rounded mr-2">Cancel</button>
                    <button
                        onClick={handleUpdateRole}
                        className="bg-indigo-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserModal