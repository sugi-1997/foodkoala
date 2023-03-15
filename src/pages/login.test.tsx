export {};

describe('Snapshot Testing', () => {
  // ログイン時、スナップショット
  test('toMatchSnapshot - 基本', () => {
    const login = `<>
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
  </>`;
    expect(login).toMatchSnapshot();
  });
  // ログインエラー時のやつ→ということはエラー分岐を完成させなくてはいかん？
  // ログイン成功時のやつ…？
});
