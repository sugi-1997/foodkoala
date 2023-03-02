import { useRouter } from "next/router";
import Cookies from "js-cookie";


import Auth from "./auth";

const Logout = () => {

    const router = useRouter();

    
    const logout = () => {
        Cookies.remove("user_id");
        router.replace("/");
    }

    return (
        <Auth>
            <button onClick={logout}>ログアウト</button>
        </Auth>
    );
}

export default Logout;