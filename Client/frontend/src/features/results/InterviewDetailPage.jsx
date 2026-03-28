import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInterviewResults } from "./resultAPI";
import { setResults, setLoading } from "./resultSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ResultTable from "./components/ResultTable";
import MainLayout from "../../shared/layout/MainLayout";
import toast from "react-hot-toast";
import { ArrowLeft, RefreshCcw } from "lucide-react";

function InterviewDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.results);

  const loadResults = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetchInterviewResults(id);
      dispatch(setResults(res.data));
    } catch {
      toast.error("Failed to load results ❌");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <MainLayout>
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Interview Results
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Viewing result breakdown for this interview
            </p>
          </div>
        </div>

        <button
          onClick={loadResults}
          disabled={loading}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
        >
          <RefreshCcw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-0.5 w-full bg-slate-100" />
              <div className="p-4 flex flex-col gap-3"> 
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100" />
                  <div className="w-16 h-5 rounded-full bg-slate-100" />
                </div>
                <div className="w-2/3 h-3.5 rounded bg-slate-100" />
                <div className="w-1/2 h-3 rounded bg-slate-100" />
                <div className="flex gap-1.5 mt-1">
                  <div className="w-12 h-5 rounded bg-slate-100" />
                  <div className="w-12 h-5 rounded bg-slate-100" />
                  <div className="w-12 h-5 rounded bg-slate-100" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <div className="w-16 h-3 rounded bg-slate-100" />
                  <div className="w-10 h-3 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ResultTable results={list} refresh={loadResults} />
      )}
    </MainLayout>
  );
}

export default InterviewDetailPage;
