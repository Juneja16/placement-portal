import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchInterviews } from "./interviewAPI";
import { setInterviews, setLoading } from "./interviewSlice";
import InterviewForm from "./components/InterviewForm";
import InterviewTable from "./components/InterviewTable";
import MainLayout from "../../shared/layout/MainLayout";
import toast from "react-hot-toast";
import { Plus, X } from "lucide-react";

function InterviewsPage() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.interviews);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loadInterviews = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetchInterviews();
      dispatch(setInterviews(res.data));
    } catch (err) {
      toast.error("Failed to fetch interviews ❌");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleSuccess = () => {
    loadInterviews();
    setDrawerOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-medium text-slate-800">Interviews</h2>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-slate-800 text-white hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} />
          Add Interview
        </button>
      </div>

      <InterviewTable interviews={list} />

      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="drawer-slide-in fixed top-0 right-0 h-full w-[420px] bg-white border-l border-slate-100 z-50 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Schedule Interview
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fill in the details to create an interview
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <InterviewForm refresh={handleSuccess} />
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default InterviewsPage;
