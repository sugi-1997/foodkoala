import '@testing-library/jest-dom/extend-expect';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import UserRegisterPage from './user_register';

// ユーザー登録（初期画面）
describe('ユーザー登録画面', () => {
  test('初期表示の確認', () => {
    const userRegister = `
    <Head>
    <title>新規会員登録</title>
  </Head>
  <Header />
  <div className={styles.background}>
    <div className={styles.logo}>
      <Image
        src="/images/foodkoala_logo.png"
        width={100}
        height={100}
        alt="logo"
      />
      <h1>Food Koala</h1>
    </div>
    <div className={styles.form_position}>
      <h2>新規会員登録</h2>
      <p className={styles.message}>
        必要事項を入力し、登録ボタンを押してください。
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const results = validate({
            name,
            email,
            zipcode,
            address,
            phone_number,
            password,
            password2,
          });
          console.log(results);
          // 各項目が未入力だった場合、エラーを表示する
          for (const prop in results) {
            if (results[prop] === 'alert') {
              setError(results);
              // console.log(results);
            }
          }

          // 電話番号が9~12文字（ハイフン有無問わず）以外の場合エラーを表示
          if (!phone_number.match(/^0[-\d]{9,12}$/)) {
            console.log('※電話番号が正しくありません。');
            setLengthError('alert');
            return;
          }
          setLengthError('ok');

          if (password.length < 8 || password.length > 16) {
            console.log(
              'パスワードは8文字以上、16文字以内で入力してください'
            );
            setPassLength('alert');
            return;
          }
          setPassLength('ok');

          if (password2 !== password) {
            console.log('※パスワードが一致していません。');
            setMismatchPassword('alert');
            return;
          }
          setMismatchPassword('ok');

          fetch('/api/get_users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.length > 0) {
                console.log(
                  '※このメールアドレスは、既に使われています。'
                );
                setErrorMail('alert');
                return;
              }
              setErrorMail('ok');
            });

          userPost();
        }}
      >
        <div className={styles.name}>
          <label htmlFor="name">お名前（漢字）</label>
          <br />
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="佐藤 太郎"
          />
          <p className={styles[error.name]}>
            ※お名前を入力してください。
          </p>
        </div>

        <div className={styles.email}>
          <label htmlFor="email">メールアドレス</label>
          <br />
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
          <p className={styles[error.email]}>
            ※メールアドレスを入力してください。
          </p>
          <p className={styles[errorMail]}>
            ※このメールアドレスは、既に使われています。
          </p>
        </div>

        <div className={styles.zipcode}>
          <label htmlFor="zipcode">郵便番号</label>
          <br />
          <input
            name="zipcode"
            type="text"
            size={8}
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="xxx-xxxx"
          />
          &nbsp;
          <button
            type="button"
            className={styles.search_button}
            onClick={getZipcode}
          >
            検索
          </button>
          <p className={styles[error.zipcode]}>
            ※郵便番号を入力してください。
          </p>
          {/* <p className={styles[validation.zipcode]}>
            ※郵便番号は、xxx-xxxxの形で入力してください。
          </p> */}
        </div>

        <div className={styles.address}>
          <label htmlFor="address">住所</label>
          <br />
          <input
            name="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="東京都新宿区新宿4-3-25"
          />
          <p className={styles[errorNoAddress]}>
            ※郵便番号を取得できませんでした。住所を入力してください。
          </p>
          <p className={styles[error.address]}>
            ※住所を入力してください。
          </p>
        </div>

        <div className={styles.phone_number}>
          <label htmlFor="phone_number">電話番号</label>
          <br />
          <input
            name="phone_number"
            type="tel"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
            placeholder="0366753638"
          />
          <p className={styles[error.phone_number]}>
            ※電話番号を入力してください。
          </p>
          <p className={styles[lengthError]}>
            ※電話番号が正しくありません。
          </p>
        </div>

        <div className={styles.password}>
          <label htmlFor="password">パスワード</label>
          <br />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="半角英数字で8文字以上、16文字以内"
            pattern="^[a-zA-Z0-9]+$"
          />
          <p className={styles[error.password]}>
            ※パスワードを入力してください。
          </p>
          <p className={styles[passLength]}>
            ※パスワードは８文字以上１６文字以内で設定してください。
          </p>
          <p className={styles[error.passwordValidation]}>
            ※パスワードは半角英数で入力してください。
          </p>
        </div>

        <div className={styles.password2}>
          <label htmlFor="password2">パスワード（確認用）</label>
          <br />
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="前述のパスワード"
            pattern="^[a-zA-Z0-9]+$"
          />
          <p className={styles[error.password2]}>
            ※確認用パスワードを入力してください。
          </p>
          <p className={styles[mismatchPassword]}>
            ※パスワードが一致していません。
          </p>
        </div>
        <br />
        <button type="submit" className={styles.submit_button}>
          登録
        </button>
      </form>
    </div>
  </div>
  <Footer />
</>
`;
    expect(userRegister).toMatchSnapshot();
  });
});

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
// ここから入力確認テスト
describe('User register', () => {
  test('nameの入力値が正しいことを確認', () => {
    render(<UserRegisterPage />);

    const name = screen.getByPlaceholderText('佐藤 太郎');

    fireEvent.change(name, {
      target: { value: '田中 太郎' },
    });

    expect(name).toHaveValue('田中 太郎');
  });

  test('emailの入力値が正しいことを確認', () => {
    render(<UserRegisterPage />);

    const email = screen.getByPlaceholderText('example@example.com');

    fireEvent.change(email, {
      target: { value: 'xxx@example.com' },
    });

    expect(email).toHaveValue('xxx@example.com');
  });

  test('zipcodeの入力値が正しいことを確認', () => {
    render(<UserRegisterPage />);

    const zipcode = screen.getByPlaceholderText('xxx-xxxx');

    fireEvent.change(zipcode, {
      target: { value: '160-0022' },
    });

    expect(zipcode).toHaveValue('160-0022');
  });

  test('addressの入力値が正しいことを確認', () => {
    render(<UserRegisterPage />);

    const address =
      screen.getByPlaceholderText('東京都新宿区新宿4-3-25');

    fireEvent.change(address, {
      target: { value: '東京都新宿区新宿1-1' },
    });

    expect(address).toHaveValue('東京都新宿区新宿1-1');
  });

  test('phone_numberの入力値が正しいことを確認', () => {
    render(<UserRegisterPage />);

    const phone_number = screen.getByPlaceholderText('0366753638');

    fireEvent.change(phone_number, {
      target: { value: '0120-82-5349' },
    });

    expect(phone_number).toHaveValue('0120-82-5349');
  });

  test('passwordの入力値が正しいことを確認', () => {
    render(<UserRegisterPage />);

    const password = screen.getByPlaceholderText(
      '半角英数字で8文字以上、16文字以内'
    );

    fireEvent.change(password, {
      target: { value: 'taro202303' },
    });

    expect(password).toHaveValue('taro202303');
  });

  test('password2の入力値が正しいことを確認', () => {
    render(<UserRegisterPage />);

    const password2 = screen.getByPlaceholderText('前述のパスワード');

    fireEvent.change(password2, {
      target: { value: 'taro202303' },
    });

    expect(password2).toHaveValue('taro202303');
  });

  //入力値が未入力であることを確認する（未完了）
  test('未入力の確認', () => {
    render(<UserRegisterPage />);
    // name
    const name = screen.getByPlaceholderText('佐藤 太郎');

    fireEvent.change(name, {
      target: { value: '' },
    });

    expect(name).toHaveValue('');

    // email
    const email = screen.getByPlaceholderText('example@example.com');

    fireEvent.change(email, {
      target: { value: '' },
    });

    expect(email).toHaveValue('');

    // zipcode
    const zipcode = screen.getByPlaceholderText('xxx-xxxx');

    fireEvent.change(zipcode, {
      target: { value: '' },
    });

    expect(zipcode).toHaveValue('');

    // address
    const address =
      screen.getByPlaceholderText('東京都新宿区新宿4-3-25');

    fireEvent.change(address, {
      target: { value: '' },
    });

    expect(address).toHaveValue('');

    // phone_number
    const phone_number = screen.getByPlaceholderText('0366753638');

    fireEvent.change(phone_number, {
      target: { value: '' },
    });

    expect(phone_number).toHaveValue('');
  });

  // fetch（POST）の確認テスト
  test('POSTが成功することを確認', async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve({ json: () => [] })
    );

    (global as any).fetch = fetchMock;

    render(<UserRegisterPage />);

    fireEvent.change(screen.getByPlaceholderText('佐藤 太郎'), {
      target: { value: '田中 太郎' },
    });

    fireEvent.change(
      screen.getByPlaceholderText('example@example.com'),
      {
        target: { value: 'xxx@example.com' },
      }
    );

    fireEvent.change(screen.getByPlaceholderText('xxx-xxxx'), {
      target: { value: '160-0022' },
    });

    fireEvent.change(
      screen.getByPlaceholderText('東京都新宿区新宿4-3-25'),
      {
        target: { value: '東京都新宿区新宿1-1' },
      }
    );

    fireEvent.change(screen.getByPlaceholderText('0366753638'), {
      target: { value: '0120-82-5349' },
    });

    fireEvent.change(
      screen.getByPlaceholderText(
        '半角英数字で8文字以上、16文字以内'
      ),
      {
        target: { value: 'taro202303' },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText('前述のパスワード'),
      {
        target: { value: 'taro202303' },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: '登録' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock).toHaveBeenCalledWith('/api/post_users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '田中 太郎',
        email: 'xxx@example.com',
        address: '東京都新宿区新宿1-1',
        zipcode: '160-0022',
        phone_number: '0120-82-5349',
        password: 'taro202303',
      }),
    });
  });
});
