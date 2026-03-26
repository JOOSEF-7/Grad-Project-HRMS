const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <button
        onClick={onClose}
        className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  );
};

export default ModalHeader;
