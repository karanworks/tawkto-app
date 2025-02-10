import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/_layout"; // Import AppDispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
