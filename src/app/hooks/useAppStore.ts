import { useStore } from "react-redux";
import { AppStore } from "../lib/store/store";

const useAppStore = useStore.withTypes<AppStore>();

export default useAppStore;
