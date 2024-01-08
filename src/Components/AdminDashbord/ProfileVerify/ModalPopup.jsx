
const ModalPopup = ({ isOpe, onClos }) => {
  if (!isOpe) return null;

  return (
    <div className=" flex items-center justify-around z-50">
      <div className="bg-white w-64 p-4 shadow-md rounded-lg">
        {/* Content of your modal */}
        <p>This is a little modal popup.</p>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClos}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalPopup;
