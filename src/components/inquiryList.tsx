import styles from 'styles/inquiryList.module.css';
import React, { useRef } from 'react';
import Link from 'next/link';

export default function InquiryList() {
  // 各フォーム初期値
  const nameRef = useRef<HTMLInputElement>(null);
  const nameKanaRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // handleSend関数
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    let data = {
      name: nameRef.current?.value,
      nameKana: nameKanaRef.current?.value,
      email: emailRef.current?.value,
      phone: phoneRef.current?.value,
      message: messageRef.current?.value,
    };

    await fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) console.log('成功', data);
      })
      .catch((error) => {
        console.error(error);
        alert('エラー');
      });
  };

  // フォームの様子
  return (
    <>
      <div className={styles.inquiryList_box}>
        <form
          action="#"
          method="post"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(e)
          }
        >
          <table>
            <tbody>
              <tr>
                <th>お名前（漢字）</th>
                <td>
                  <input
                    type="text"
                    className={styles.input_width}
                    ref={nameRef}
                  />
                </td>
              </tr>

              <tr>
                <th>お名前（ふりがな）</th>
                <td>
                  <input
                    type="text"
                    className={styles.input_width}
                    ref={nameKanaRef}
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
                    ref={emailRef}
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
                    ref={phoneRef}
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
                    ref={messageRef}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <Link href="/inquiry_completed">
            <button type="submit" className={styles.button_inside}>
              送る
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}
