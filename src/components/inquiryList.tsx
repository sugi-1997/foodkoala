import styles from 'styles/inquiryList.module.css';

export default function InquiryList() {
  return (
    <>
      <div className={styles.inquiryList_box}>
        <form action="#" method="post">
          <table>
            <tr>
              <th>お名前（漢字）</th>
              <td>
                <input type="text" className={styles.input_width} />
              </td>
            </tr>

            <tr>
              <th>お名前（ふりがな）</th>
              <td>
                <input type="text" className={styles.input_width} />
              </td>
            </tr>

            <tr>
              {/* 必須 */}
              <th>
                メールアドレス<span>*</span>
              </th>
              <td>
                <input
                  type="mail"
                  className={styles.input_width}
                  required
                  name="email"
                />
              </td>
            </tr>

            {/* 必須 */}
            <tr>
              <th>
                電話番号<span>*</span>
              </th>
              <td>
                <input
                  type="text"
                  className={styles.input_width}
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
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

            {/* 必須 */}
            <tr>
              <th>
                お問い合わせ内容の詳細（300字以内）<span>*</span>
              </th>
              <td>
                <textarea
                  name="textarea"
                  id=""
                  cols={50}
                  rows={5}
                  required
                ></textarea>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
}
