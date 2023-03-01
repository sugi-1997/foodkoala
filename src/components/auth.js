// 注文ページをAuthコンポーネントで囲むイメージ

import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Auth = ({ children }) => {

    const router = useRouter();

    const signedIn = Cookies.get("signedIn");

    ログインページのエラーが解消し次第コメント解除します 
    if (signedIn !== "true") router.replace("/index");

    return children;
}

export default Auth;