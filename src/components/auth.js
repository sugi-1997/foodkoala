// 注文ページをAuthコンポーネントで囲むイメージ

import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Auth = ({ children }) => {

    const router = useRouter();

    const user_id = Cookies.get("user_id");

    if (user_id !== data[0].id) router.replace("/loginPage");

    return children;
}

export default Auth;