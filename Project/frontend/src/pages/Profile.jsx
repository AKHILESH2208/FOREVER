import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext)
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  })
  const [isEdit, setIsEdit] = useState(false)
  const [totalOrders, setTotalOrders] = useState(0)
  const [accountDate, setAccountDate] = useState('')

  const getUserData = async () => {
    try {
      if (!token) {
        navigate('/login')
        return
      }
      const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } })
      if (response.data.success) {
        setUserData({
          name: response.data.user.name,
          email: response.data.user.email
        })
        // Set account creation date
        if (response.data.user.createdAt) {
          setAccountDate(new Date(response.data.user.createdAt).toLocaleDateString())
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getUserOrders = async () => {
    try {
      if (!token) {
        return
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        setTotalOrders(response.data.orders.length)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfile = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/update', userData, { headers: { token } })
      if (response.data.success) {
        toast.success('Profile updated successfully')
        setIsEdit(false)
        getUserData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getUserData()
    getUserOrders()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-8'>
        <p className='text-3xl font-medium mb-4'>MY PROFILE</p>
      </div>

      <div className='max-w-lg'>
        <div className='flex flex-col gap-4'>
          <div>
            <p className='text-sm text-gray-600 mb-2'>Name</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className='border border-gray-300 rounded py-2 px-3 w-full'
              />
            ) : (
              <p className='text-gray-800'>{userData.name}</p>
            )}
          </div>

          <div>
            <p className='text-sm text-gray-600 mb-2'>Email</p>
            <p className='text-gray-800'>{userData.email}</p>
            <p className='text-xs text-gray-500 mt-1'>Email cannot be changed</p>
          </div>

          <div className='mt-4 flex gap-3'>
            {isEdit ? (
              <>
                <button
                  onClick={updateProfile}
                  className='bg-black text-white px-8 py-2 rounded-sm'
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false)
                    getUserData()
                  }}
                  className='border border-black px-8 py-2 rounded-sm'
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className='bg-black text-white px-8 py-2 rounded-sm'
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className='mt-12 pt-8 border-t'>
          <p className='text-xl font-medium mb-4'>Account Information</p>
          <div className='space-y-2 text-sm text-gray-600'>
            <p>Total Orders: <span className='font-medium text-gray-800'>{totalOrders}</span></p>
            {accountDate && <p>Account Created: <span className='font-medium text-gray-800'>{accountDate}</span></p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
