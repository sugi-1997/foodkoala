import BreadList, {
  menu_list,
  inquiry_form,
} from 'components/bread_list';
import Header from 'components/header';
import Footer from 'components/footer';
import Head from 'next/head';
import styles from 'styles/Inquiry_form.module.css'; 
import InquiryList from 'components/inquiryList';
import Link from 'next/link';

export default function InquiryForm() {
  return (
    <>
      <Head>
        <title>お問い合わせフォーム</title>
      </Head>
      <Header />
      <BreadList list={[menu_list, inquiry_form]} />
      <div className={styles.Inquiry_form}>
        <h1>お問い合わせフォーム</h1>
        <dl className={styles.input_form}>
          <InquiryList />
        </dl>
      </div>
      <div className={styles.button}>
        <button type="submit"
        className={styles.button_inside}><Link href='/inquiry_completed'>送信する</Link></button>
      </div>
      <Footer />
    </>
  );
}