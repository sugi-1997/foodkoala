import styles from 'styles/inquiryList.module.css'


export default function InquiryList() {
    return (
      <>
      <form action="#"  method='post'>
      <div className={styles.inquiryList}>
      <dl>
        <dt>お名前（漢字）</dt>
        <dd>
          <input type="text" />
        </dd>
        <dt>お名前（ふりがな）</dt>
        <dd>
          <input type="text" />
        </dd>
        <dt>メールアドレス</dt>
        <dd>
          <input type="mail" />
        </dd>
        <dt>電話番号</dt>
        <dd>
          <input type="text" />
        </dd>
        <dt>お問い合わせ内容を選ぶ</dt>
        <dd>
          <input type="radio" id="inquiry_choice1" name="inquiry" />
          <label htmlFor="inquiry_choice1">
            追加して欲しいショップがある
          </label>
        </dd>
        <dd>
          <input type="radio" id="inquiry_choice2" name="inquiry" />
          <label htmlFor="inquiry_choice2">
            注文に関するお問い合わせ
          </label>
        </dd>
        <dd>
          <input type="radio" id="inquiry_choice3" name="inquiry" />
          <label htmlFor="inquiry_choice3">
            ショップに関するお問い合わせ
          </label>
        </dd>
        <dd>
          <input type="radio" id="inquiry_choice4" name="inquiry" />
          <label htmlFor="inquiry_choice4">
            お支払いに関するお問い合わせ
          </label>
        </dd>
        <dd>
          <input type="radio" id="inquiry_choice5" name="inquiry" />
          <label htmlFor="inquiry_choice5">その他</label>
        </dd>
        <dt>お問い合わせ内容の詳細（300字以内）</dt>
        <dd><textarea name="textarea" id="" cols={50} rows={5}></textarea>
        </dd> 
        </dl>
        </div>
        </form>
      </>
    );
  }
  