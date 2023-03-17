import Header from 'components/header';
import Footer from 'components/footer';
import Head from 'next/head';
import styles from 'styles/Inquiry_form.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function InquiryCompleated() {
  return (
    <>
      <Head>
        <title>お問い合わせ完了</title>
      </Head>
      <Header />
      <div className={styles.Inquiry_form}>
        <Image
          src="/images/foodkoala_img2.png"
          alt="concept"
          width={300}
          height={300}
          className={styles.koala}
        />
        <h1>お問い合わせ、ありがとうございました</h1>
        <p>後日、担当者よりご連絡差し上げます</p>
      </div>
      <div>
        <button type="submit" className={styles.button_design}>
          <Link href="/">お買い物を続ける</Link>
        </button>
      </div>
      <Footer />
    </>
  );
}
