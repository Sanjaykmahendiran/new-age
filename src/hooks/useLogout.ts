import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useLogout = () => {
  const router = useRouter();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const logout = () => {
    Cookies.remove("recruiterId", { path: basePath });
    Cookies.remove("authToken", { path: basePath });
    router.push("/");
  };

  return logout;
};

export default useLogout;
