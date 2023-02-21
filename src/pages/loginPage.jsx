import Head from "next/head"

export default function LoginPage() {

    return (
        <>
        <Head>
          <title>ログイン</title>
        </Head>
          <form /*onSubmit={handleSend}*/>
            <div>
            <label>メールアドレス:
              <input 
              name='email'
              type="email" 
              /*onChange={handleChange}*/
              />
            </label>
            </div>
            <div>
            <label>パスワード: 
              <input 
              name='password'
              type="password" 
              /*onChange={handleChange}*/
              />
            </label>
            </div>
            <button type="submit">ログイン</button>
          </form>
          </>
          )}
          /*ログインボタン押した後、商品一覧へ遷移…？*/