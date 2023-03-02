import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/userRegistItem.module.css';
import { useRouter } from 'next/router';
import React from 'react';

const resource = 'http://localhost:3000/api/post_users';

export default function UserRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorAlert, setErrorAlert] = useState('ok');

  const router = useRouter();

  function getZipcode() {
    fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
    )
      .then((res) => res.json())
      .then((data) =>
        setAddress(
          `${
            data.results[0].address1 +
            data.results[0].address2 +
            data.results[0].address3
          }`
        )
      );
  }

  return (
    <>
      <Head>
        <title>新規会員登録</title>
      </Head>
      <Header />

      <div className={styles.userRegistPosition}>
        <h3>会員情報登録</h3>
        <form
          action={resource}
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
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
                  return;
                }
              });
            if (password !== password2) {
              console.log('※パスワードが一致していません。');
              setErrorAlert('alert');
              return;
            }

            fetch(resource, {
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
            })
              // 登録完了画面へ遷移
              .then((response) => {
                if (response.ok) {
                  router.push('/userResister_completed');
                }
              });
          }}
        >
          <div>
            <div className={styles.userRegistItem}>
              お名前（漢字）
            </div>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例:佐藤 太郎"
              required
            />
          </div>

          <p>{/* 幅を合わせるために<p>を入れています。 */}</p>

          <div>
            <div className={styles.userRegistItem}>
              メールアドレス
            </div>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
            />
            <p>※このメールアドレスは、既に使われています。</p>
          </div>

          <div>
            <div className={styles.userRegistItem}>郵便番号</div>
            <input
              name="zipcode"
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder="xxx-xxxx"
              required
            />
            <button onClick={getZipcode}>検索</button>
            <p>※郵便番号はxxx-xxxxの形で入力してください。</p>
          </div>

          <div>
            <div className={styles.userRegistItem}>住所</div>
            <input
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="東京都新宿区新宿4-3-25"
              required
            />
            <p>{/* 幅を合わせるために<p>を入れています。 */}</p>
          </div>

          <div>
            <div className={styles.userRegistItem}>電話番号</div>
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

          <div>
            <div className={styles.userRegistItem}>パスワード</div>
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

          <div>
            <div className={styles.userRegistItem}>
              パスワード（確認用）
            </div>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="前述のパスワード"
              required
              pattern="^[a-zA-Z0-9]+$"
            />
            <p className={styles[errorAlert]}>
              ※パスワードが一致していません。
            </p>
          </div>

          <br />
          <button type="submit">登録</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
