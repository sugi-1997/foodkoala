import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/userRegistItem.module.css';
import { useRouter } from 'next/router';

const resource = 'http://localhost:3000/api/users';

export default function UserRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);

  const router = useRouter();

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
              // 一旦トップページに遷移させておく（後ほど変更必要）
              .then((response) => {
                if (response.ok) {
                  alert('登録が完了しました！');
                  return;
                }
              })

              .catch((err) => {
                console.error(err);
                setErr(true);
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

          {/* <div>
            <div className={styles.userRegistItem}>
              名前（ふりがな）
            </div>
            <input
              name="familyNameKana"
              type="text"
              onChange={handleChange}
              placeholder="例:さとう たろう"
              required
            />
          </div> */}

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
          </div>

          <div>
            <div className={styles.userRegistItem}>電話番号</div>
            <input
              name="phone_number"
              type="text"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              placeholder="0366753638"
              required
            />
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
          </div>

          <div>
            <div className={styles.userRegistItem}>
              パスワード（確認用）
            </div>
            <input
              name="password2"
              type="password"
              placeholder="前述のパスワード"
              required
              pattern="^[a-zA-Z0-9]+$"
            />
          </div>

          <br />
          <button type="submit">登録</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
