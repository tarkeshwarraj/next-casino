import React from "react";

const CashApp = ({formData, handleChange}) => {

  return (
    <>
      <div className="px-3" >
        <label className="block text-sm font-medium text-gray-700 mb-1" >
          Name
        </label>
        <input
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Name"
        />
      </div>

      <div className="space-y-5 px-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm pointer-events-none">
              $
            </span>
            <input
              name="request_amount"
              value={formData.request_amount}
              onChange={handleChange}
              required
              type="number"
              min="2"
              className=" text-black w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
              placeholder="Enter amount"
            />
          </div>
        </div>
    </>
  );
};

export default CashApp;
