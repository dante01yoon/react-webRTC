import { useSelector } from "react-redux";
import type { WebStore } from "../stores";


const useStores = () => {
  const store = useSelector((state: WebStore) => state);
  return store;
};

export default useStores;