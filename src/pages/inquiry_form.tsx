import Header from 'components/header';
import Head from 'next/head';
import styles from '@/styles/Inquiry_form.module.css';

export function InquiryList() {
  return (
    <>
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
      <textarea name="textarea" id="" cols={50} rows={5}></textarea>
    </>
  );
}

export default function InquiryForm() {
  return (
    <>
      <Header />
      <Head>
        <title>お問い合わせフォーム</title>
      </Head>
      <div className={styles.Inquiry_form}>
        <h1>お問い合わせフォーム</h1>
        <dl className={styles.input_form}>
          <InquiryList />
        </dl>
      </div>
      <div className={styles.button}>
        <button type="submit">送信する</button>
      </div>
    </>
  );
}
