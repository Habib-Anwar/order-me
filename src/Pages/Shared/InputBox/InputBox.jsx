import React from 'react'

export const InputBox = ({ type, placeholder, name, productCode }) => {
  return (
 <div className="mb-6">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={productCode}
      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
    />
  </div>
  )
}
