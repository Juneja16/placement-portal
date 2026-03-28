import { useDispatch, useSelector } from "react-redux";

// 🔥 Custom hook for dispatch
export const useAppDispatch = () => useDispatch();

// 🔥 Custom hook for selecting state
export const useAppSelector = useSelector;