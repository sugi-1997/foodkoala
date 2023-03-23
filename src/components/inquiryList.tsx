import styles from 'styles/inquiryList.module.css';
import React, { useState, SyntheticEvent } from 'react';

export default function InquiryList() {
  // 各フォーム初期値
  const [name, setName] = useState('');
  const [nameKana, setNameKana] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // handleSend関数
  const handleSend = (e: SyntheticEvent) => {
    e.preventDefault();

    fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        nameKana,
        email,
        phone,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          console.log('success', data);
        } else {
          console.log('エラーその1');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('エラーその2');
      });
  };

  // handleChange関数
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'nameKana':
        setNameKana(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
    }
  };

  // フォームの様子
  return (
    <>
      <div className={styles.inquiryList_box}>
        <form action="#" method="post" onSubmit={handleSend}>
          <table>
            <tr>
              <th>お名前（漢字）</th>
              <td>
                <input
                  type="text"
                  className={styles.input_width}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>お名前（ふりがな）</th>
              <td>
                <input
                  type="text"
                  className={styles.input_width}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                {/* 必須マークの(*) */}
                メールアドレス<span>*</span>
              </th>
              <td>
                <input
                  type="mail"
                  className={styles.input_width}
                  required
                  name="email"
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                電話番号<span>*</span>
              </th>
              <td>
                <input
                  type="text"
                  className={styles.input_width}
                  required
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                {/* 必須マークの(*) */}
                お問合わせ内容を選ぶ<span>*</span>
              </th>
              <td>
                <div>
                  <input
                    type="radio"
                    id="inquiry_choice1"
                    name="inquiry"
                  />
                  <label htmlFor="inquiry_choice1">
                    追加して欲しいショップがある
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="inquiry_choice2"
                    name="inquiry"
                  />
                  <label htmlFor="inquiry_choice2">
                    注文に関するお問い合わせ
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="inquiry_choice3"
                    name="inquiry"
                  />
                  <label htmlFor="inquiry_choice3">
                    ショップに関するお問い合わせ
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="inquiry_choice4"
                    name="inquiry"
                  />
                  <label htmlFor="inquiry_choice4">
                    お支払いに関するお問い合わせ
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="inquiry_choice5"
                    name="inquiry"
                  />
                  <label htmlFor="inquiry_choice5">その他</label>
                </div>
              </td>
            </tr>

            <tr>
              <th>
                {/* 必須マークの(*) */}
                お問い合わせ内容の詳細（300字以内）<span>*</span>
              </th>
              <td>
                <textarea
                  name="textarea"
                  id=""
                  cols={50}
                  rows={5}
                  required
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
          </table>
          <button type="submit">送る</button>
        </form>
      </div>
    </>
  );
}
