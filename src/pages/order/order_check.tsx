import Head from 'next/head';
import OrderList from '../../components/order_list';
import Option from '../../components/option';
import SelectPay from '../../components/select_pay';

export default function OrderCheck() {
  return (
    <>
      <Head>
        <title>注文確認</title>
      </Head>
      <div>
        <OrderList />
      </div>
      <div>
        <Option />
      </div>
      <div>
        <SelectPay />
      </div>
      <div>
        <button type="submit">注文を確定する</button>
      </div>
    </>
  );
}
