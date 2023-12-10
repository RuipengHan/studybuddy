import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
    <div className="mt-3 text-center">
        <div className="mt-2 px-7 py-3">
        <p className="text-gray-800">{message}</p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onClose}
        >
            Close
        </button>
        </div>
    </div>
    </div>
    </div>
  );
};

export default ErrorModal;
