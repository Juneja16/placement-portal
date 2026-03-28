function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl shadow hover:shadow-md transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;