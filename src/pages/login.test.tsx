import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { useRouter } from 'next/router';
import Login from './login';
import fetch from 'node-fetch';

export {};

//遷移のテストの時に使うはず…？
jest.mock('next/router', () => ({ useRouter: jest.fn() }));

describe('Login', () => {
  test('ポストできてるか', async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve({ json: () => [] })
    );

    (global as any).fetch = fetchMock;

    render(<Login />);

    fireEvent.change(
      screen.getByPlaceholderText('something@example.com'),
      {
        target: { value: 'test@example.com' },
      }
    );
    fireEvent.change(
      screen.getByPlaceholderText('半角英数字で8文字以上'),
      {
        target: { value: 'password' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password',
      }),
    });
  });

  test('ログイン失敗時にアラートがでるか否か', async () => {
    const fetchMock = jest.fn(() =>
      /*ここの扱いが決めっぽい↓*/

      Promise.resolve({ json: () => null || undefined })
    );
    (global as any).fetch = fetchMock;

    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('入力内容を確認してください');
  });

  //cookieのセットのやつまだテストかけていない

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
  // 一旦保留するか。
});
