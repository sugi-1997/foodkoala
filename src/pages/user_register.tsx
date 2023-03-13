import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/userRegisterPage.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function UserRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorZipcode, setErrorZipcode] = useState('ok');
  const [errorAddress, setErrorAddress] = useState('ok');
  const [errorMail, setErrorMail] = useState('ok');
  const [errorPassword, setErrorPassword] = useState('ok');

  const router = useRouter();

  function getZipcode() {
    if (zipcode === '') {
      console.log('※郵便番号を入力してください。');
      setErrorZipcode('alert');
      return;
    }
    setErrorZipcode('ok');
    fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          console.log('郵便番号が取得できませんでした');
          setErrorAddress('alert');
          return;
        } else {
          console.log('郵便番号が取得できました');
          setAddress(
            `${
              data.results[0].address1 +
              data.results[0].address2 +
              data.results[0].address3
            }`
          );
        }
      });
  }
  function userPost() {
    fetch('/api/post_users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        address: address,
        zipcode: zipcode,
        phone_number: phone_number,
        password: password,
      }),
    }).then((response) => {
      //userテーブルからidを取得
      if (response.ok) {
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
            const user_id = data[0].id;
            console.log('user_id', user_id);
            //couponテーブルにwelcome couponをPOST
            fetch(`/api/post_coupon`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: user_id,
                couponcode: 'welcome coupon',
                discount: 10,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                // 登録完了画面へ遷移
                console.log('welcome couponを付与しました');
                localStorage.setItem('name', name);
                router.push('/user_register_completed');
              })
              .catch((error) => console.error(error));
          })
          .catch((error) => console.error(error));
      }
    });
  }

  return (
    <>
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

              if (password !== password2) {
                console.log('※パスワードが一致していません。');
                setErrorPassword('alert');
                return;
              }
              setErrorPassword('ok');

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
                  userPost();
                });
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
                placeholder="例:佐藤 太郎"
                required
              />
              <p>※文字が入ります。</p>
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
                required
              />
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
                required
              />
              &nbsp;
              <button
                className={styles.search_button}
                onClick={getZipcode}
              >
                検索
              </button>
              <p className={styles[errorZipcode]}>
                ※郵便番号を入力してください。
              </p>
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
              <p className={styles[errorAddress]}>
                ※郵便番号を取得できませんでした。住所を入力してください。
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
                required
              />
              <p>※電話番号はxxxx-xxxx-xxxxの形で入力してください。</p>
            </div>

            <div className={styles.password}>
              <label htmlFor="password">パスワード</label>
              <br />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="半角英数字で8文字以上"
                required
                pattern="^[a-zA-Z0-9]+$"
              />
              <p>
                ※パスワードは８文字以上１６文字以内で設定してください。
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
                required
                pattern="^[a-zA-Z0-9]+$"
              />
              <p className={styles[errorPassword]}>
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
  );
}
