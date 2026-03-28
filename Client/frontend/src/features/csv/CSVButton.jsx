import { downloadCSV } from "./csvAPI";
import toast from "react-hot-toast";

function CSVButton() {
  const handleDownload = async () => {
    try {
      const res = await downloadCSV();

      // Create file
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "interview-data.csv");

      document.body.appendChild(link);
      link.click();

      toast.success("CSV downloaded 🎉");
    } catch {
      toast.error("Download failed ❌");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl shadow"
    >
      Download CSV
    </button>
  );
}

export default CSVButton;