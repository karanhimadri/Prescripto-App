import { useState } from 'react'

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [editedData, setEditedData] = useState({
    name: 'Dr. Richard James',
    degree: 'MBBS - General physician',
    experience: 4,
    about: `Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`,
    fees: 500,
    addressLine1: 'Kolkata',
    addressLine2: 'Mumbai',
    available: true,
  })
  const handleChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='flex flex-col gap-4 m-5'>
      <div>
        <img src="/images/doc1.png" alt=""
          className='bg-primary/80 w-full sm:max-w-64 rounded-lg'
        />
      </div>

      <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
        {/* Name */}
        <div className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
          {isEdit ? (
            <input
              type='text'
              value={editedData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className='border rounded px-2 py-1 text-xl w-full max-w-md'
            />
          ) : (
            <p>{editedData.name}</p>
          )}
        </div>

        {/* Degree and Experience */}
        <div className='flex items-center gap-2 mt-1 text-gray-600'>
          {isEdit ? (
            <>
              <input
                type='text'
                value={editedData.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                className='border rounded px-2 py-1 text-sm'
              />
              <input
                type='number'
                value={editedData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                className='border rounded px-2 py-1 text-sm'
              />
              <p>Years</p>
            </>
          ) : (
            <>
              <p>{editedData.degree}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{editedData.experience} Years</button>
            </>
          )}
        </div>

        {/* About */}
        <div className='mt-3'>
          <p className='flex items-center gap-1 text-sm font-medium text-neutral-800'>About:</p>
          {isEdit ? (
            <textarea
              value={editedData.about}
              onChange={(e) => handleChange('about', e.target.value)}
              className='border rounded px-2 py-1 w-full mt-1 text-sm'
              rows={4}
            />
          ) : (
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{editedData.about}</p>
          )}
        </div>

        {/* Appointment Fee */}
        <p className='text-gray-600 font-medium mt-4'>
          Appointment fee:
          <span className='text-gray-800 ml-1'>
            {isEdit ? (
              <input
                type='number'
                value={editedData.fees}
                onChange={(e) => handleChange('fees', e.target.value)}
                className='border rounded px-2 py-1 text-sm w-24'
              />
            ) : (
              `₹${editedData.fees}`
            )}
          </span>
        </p>

        {/* Address */}
        <div className='flex flex-col gap-1 py-2'>
          <p className='text-sm font-medium text-gray-700'>Address:</p>
          {isEdit ? (
            <>
              <input
                type='text'
                value={editedData.addressLine1}
                onChange={(e) => handleChange('addressLine1', e.target.value)}
                className='border rounded px-2 py-1 text-sm w-full max-w-md'
                placeholder='Line 1'
              />
              <input
                type='text'
                value={editedData.addressLine2}
                onChange={(e) => handleChange('addressLine2', e.target.value)}
                className='border rounded px-2 py-1 text-sm w-full max-w-md'
                placeholder='Line 2'
              />
            </>
          ) : (
            <p className='text-sm'>
              Line1: {editedData.addressLine1}
              <br />
              Line2: {editedData.addressLine2}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className='flex gap-2 pt-2 items-center'>
          {isEdit ? (
            <>
              <input
                type="checkbox"
                checked={editedData.available}
                onChange={(e) => handleChange('available', e.target.checked)}
                id='available'
              />
              <label htmlFor="available">Available</label>
            </>
          ) : (
            <>
              <input type="checkbox" checked={editedData.available} disabled />
              <label>Available</label>
            </>
          )}
        </div>

        {/* Edit / Save Button */}
        <button
          onClick={() => setIsEdit(!isEdit)}
          className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>
          {isEdit ? 'Save Information' : 'Edit'}
        </button>
      </div>
    </div>
  )
}

export default DoctorProfile
