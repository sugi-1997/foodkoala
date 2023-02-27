import styles from 'styles/order_check.module.css';

export default function SelectPay() {
  return (
    <>
      <h1>お支払い方法</h1>
      <div className={styles.select_pay}>
        <div className={styles.select_card}>
          <input type="radio" id="select_card" name="select_pay" />
          <label htmlFor="select_card">クレジットカード</label>
        </div>
        <div className={styles.select_money}>
          <input type="radio" id="select_money" name="select_pay" />
          <label htmlFor="select_money">現金</label>
        </div>
      </div>
    </>
  );
}
