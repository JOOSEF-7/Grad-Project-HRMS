export default function Button({ children, onClick, className = "", disabled, ...props  }) {
 return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full  text-white font-medium py-4 px-6 rounded-full transition-colors duration-200
        ${disabled
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

