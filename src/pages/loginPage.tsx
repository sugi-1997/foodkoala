import Head from 'next/head';
import styles from '@/styles/loginPage.module.css';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>

      <div className={styles.loginPagePosition}>
        <form /*onSubmit={handleSend}*/>
          <p>以下のフォームに入力してログイン</p>

          <div>
            <div className={styles.loginPage}>メールアドレス</div>
            <input
              name="email"
              type="email"
              // onChange = {handleChange}
              placeholder="example@example.com"
              required
            />
          </div>

          <div>
            <div className={styles.loginPage}>パスワード</div>
            <input
              name="password1"
              type="password"
              // onChange = {handleChange}
              placeholder="半角英数字で8文字以上"
              required
              pattern="^[a-zA-Z0-9]+$"
            />
          </div>

          <div>
            <button type="submit">ログイン</button>
          </div>
        </form>
      </div>
    </>
  );
}
/*ログインボタン押した後、どこへ遷移…？*/
