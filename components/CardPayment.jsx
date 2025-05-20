import React, { useState, useEffect } from "react";

const CreditCardForm = ({ formData, handleChange }) => {
  // Initialize expiry state from formData if available
  const [expiry, setExpiry] = useState(() => {
    if (formData.expiry_month && formData.expiry_year) {
      return `${formData.expiry_month}/${formData.expiry_year}`;
    }
    return "";
  });

  // Sync local expiry state if formData changes externally
  useEffect(() => {
    if (formData.expiry_month && formData.expiry_year) {
      setExpiry(`${formData.expiry_month}/${formData.expiry_year}`);
    } else {
      setExpiry("");
    }
  }, [formData.expiry_month, formData.expiry_year]);

  // Allow only letters and spaces in card holder name
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      handleChange({ target: { name: "card_holder_name", value } });
    }
  };

  // Allow only numbers in card number and detect card type
  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value;
    const value = rawValue.replace(/\D/g, ""); // Remove non-digits

    handleChange({ target: { name: "card_number", value } });

    // let detectedType = '';
    // if (value.startsWith('4')) detectedType = 'VISA';
    // else if (value.startsWith('5')) detectedType = 'MASTERCARD';
    // else if (value.startsWith('3')) detectedType = 'AMEX';
    // else if (value.startsWith('6')) detectedType = 'DISCOVER';

    // if (detectedType) {
    //   handleChange({ target: { name: 'card_type', value: detectedType } });
    // }
  };

  // Handle expiry input with auto "/" insertion
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    let formatted = value;
    if (value.length > 2) {
      formatted = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(formatted);

    // Only update formData if month and year are valid length
    if (value.length >= 2) {
      handleChange({
        target: { name: "expiry_month", value: value.slice(0, 2) },
      });
    }
    if (value.length === 4) {
      handleChange({ target: { name: "expiry_year", value: value.slice(2) } });
    }
  };

  return (
    <div className="bg-white px-3 rounded-xl space-y-6 w-full max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Card Holder Name
        </label>
        <input
          name="card_holder_name"
          value={formData.card_holder_name}
          onChange={handleNameChange}
          required
          className="text-black w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      {/* Hidden Card Type Field */}
      <input
        type="hidden"
        name="card_type"
        value={formData.card_type}
        readOnly
      />

      <div className="relative">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Card Number
        </label>

        <input
          name="card_number"
          value={formData.card_number}
          onChange={handleCardNumberChange}
          required
          className="text-black w-full border border-gray-300 rounded-lg p-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1234 1234 1234 1234"
          inputMode="numeric"
          maxLength={16}
        />

        {formData.card_type && (
          <span className="absolute right-3 top-12 text-sm text-gray-500 pointer-events-none">
            {formData.card_type}
          </span>
        )}
      </div>

      {/* Expiry + CVV Row */}
      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Expiry date
          </label>
          <input
            name="expiry"
            value={expiry}
            onChange={handleExpiryChange}
            maxLength={5} // MM/YY is 5 chars including slash
            required
            className="text-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 border-violet-300 placeholder-gray-400"
            placeholder="MM/YY"
            inputMode="numeric"

          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            CVV
          </label>
          <input
            name="cvv"
            type="password"
            value={formData.cvv}
            onChange={handleChange}
            required
            className="text-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 border-violet-300 placeholder-gray-400"
            placeholder="123"
            inputMode="numeric"
            maxLength={3}
          />
        </div>

        
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
          Zip Code
        </label>

        <input
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
          required
          className="text-black w-2/4 border border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="12345"
          inputMode="numeric"
          maxLength={5}
        />
        </div>
      

      {/* Save for future payments */}
      <div className="flex items-center mt-2 hidden">
        <input
          id="saveInfo"
          type="checkbox"
          name="save_info"
          checked={formData.save_info || false}
          onChange={(e) =>
            handleChange({
              target: { name: "save_info", value: e.target.checked },
            })
          }
          className="text-black h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
        />
        <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600 ">
          Save information for future payments
        </label>
      </div>

      <div className="space-y-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (Min-3$)
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
              min="3"
              className="text-black w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
              placeholder="Enter amount"
            />
          </div>
        </div>
    </div>
  );
};

export default CreditCardForm;
