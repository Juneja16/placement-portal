function Input({ ...props }) {
  return (
    <input
      className="border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      {...props}
    />
  );
}

export default Input;