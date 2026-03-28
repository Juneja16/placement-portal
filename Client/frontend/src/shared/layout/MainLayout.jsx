import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Outer centering shell */}
      <div className="flex justify-center px-6 py-8">
        {/* Content column — constrained + highlighted with side borders */}
        <div
          className="w-full max-w-5xl min-h-[calc(100vh-7rem)]
            bg-white
            border-x border-slate-100
            shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_24px_rgba(0,0,0,0.04)]
            rounded-2xl
            px-10 py-8"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
