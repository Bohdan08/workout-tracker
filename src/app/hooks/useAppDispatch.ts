import { useDispatch } from "react-redux";
import { AppDispatch } from "../lib/store/store";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
