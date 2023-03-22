import Cookies from 'js-cookie';
import { useEffect } from 'react';
import styles from 'styles/order_check.module.css';

export default function SelectPay() {
  const userId = Cookies.get('user_id');
  useEffect(() => {
    const postPayment = async () => {
      await fetch(`/api/patch_carts?user_id=eq.${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: Number(userId),
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };
    postPayment();
  }, []);

  const patchPayment = async (selectedpayment: string) => {
    await fetch(`/api/patch_carts?user_id=eq.${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: Number(userId),
        payment_method: selectedpayment,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <h1>お支払い方法</h1>
      <div className={styles.select_pay}>
        <div className={styles.select_card}>
          <input
            type="radio"
            id="select_card"
            name="select_pay"
            onChange={() => {
              const selectedPayment = 'クレジットカード';
              patchPayment(selectedPayment);
            }}
            value={'card'}
          />
          <label htmlFor="select_card">クレジットカード</label>
        </div>
        <div className={styles.select_money}>
          <input
            type="radio"
            id="select_money"
            name="select_pay"
            onChange={() => {
              const selectedPayment = '現金';
              patchPayment(selectedPayment);
            }}
            value={'cash'}
          />
          <label htmlFor="select_money">現金</label>
        </div>
      </div>
    </>
  );
}
