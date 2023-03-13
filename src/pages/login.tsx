import Head from 'next/head';
import styles from '../styles/loginPage.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';

// login.tsの住所
const url = '/api/login';

export default function Login() {
  const router = useRouter();

  const handleSend = (e) => {
    e.preventDefault();

    // login.tsにポスト
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    })
      .then((response) => response.json())

      // login.tsからGETしたdata.lengthが0じゃない(emailとPWが合致したuserが帰ってきてる)
      .then((data) => {
        if (data.length !== 0) {
          console.log('success', data);

          //data配列の0番目のオブジェクトからidを抽出してcookieのvalueに付与
          Cookies.set('user_id', data[0].id);

          // メインページに遷移(遷移先はあとで変更してもよし)
          // router.push('/');
        } else {
          alert('入力内容を確認してください');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('エラー(.catch)');
      });
  };

  // フォームの内容をlogin.tsにPOST
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  //画面
  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <div className={styles.background}>
        <div className={styles.logo}>
          <Image
            src="/images/foodkoala_logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className={styles.title_font}>Food Koala</h1>

        <div className={styles.loginPageAll}>
          <form onSubmit={handleSend}>
            <p>ログインしてお買い物を始めましょう!</p>

            <div>
              <div className={styles.loginPage_item}>
                メールアドレス
              </div>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="something@example.com"
                required
                className={styles.input_text_design}
              />
            </div>

            <div>
              <div className={styles.loginPage_item}>パスワード</div>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="半角英数字で8文字以上"
                required
                pattern="^[a-zA-Z0-9]+$"
                className={styles.input_text_design}
              />
            </div>
            <br />
            <hr className={styles.hr} />
            <br />
            <div>
              <input
                type="submit"
                value="ログイン"
                className={styles.login_button_design}
              />
              <Link href="/">
                <input
                  type="button"
                  value="ログインせずに商品を探す"
                  className={styles.login_button_design}
                />
              </Link>
            </div>
          </form>
        </div>
        <br />
        <div className={styles.go_to_resister}>
          <p>アカウントをお持ちではありませんか？</p>
          <p>
            <Link href="/user_register">アカウントを作成</Link>
          </p>
        </div>
      </div>
    </>
  );
}
