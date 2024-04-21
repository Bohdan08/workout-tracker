import { useSelector } from "react-redux";
import { RootState } from "../lib/store/store";

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
