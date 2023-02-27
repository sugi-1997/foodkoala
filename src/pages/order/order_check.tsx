import Head from 'next/head';
import OrderList from '../../components/order_list';
import Option from '../../components/option';
import SelectPay from '../../components/select_pay';
import Header from 'components/header';
import Footer from 'components/footer';
import styles from 'styles/order_check.module.css';

export default function OrderCheck() {
  return (
    <>
      <Head>
        <title>注文確認</title>
      </Head>
      <Header />
      <div className={styles.order_check}>
        <div>
          <OrderList />
        </div>
        <div>
          <div>
            <Option />
          </div>
          <div>
            <SelectPay />
            <div className={styles.order_check_button}>
              <button type="submit">注文を確定する</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
