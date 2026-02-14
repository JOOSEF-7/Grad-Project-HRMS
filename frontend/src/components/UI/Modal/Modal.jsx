const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 blur-sm"
      />

      {/* modal */}
      <div className="relative w-full max-w-[420px] rounded-3xl bg-[#24272E] text-white shadow-2xl ">
        {children}
      </div>
    </div>
  );
};

export default Modal;
