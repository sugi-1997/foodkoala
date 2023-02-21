export default function SelectPay() {
  return (
    <>
      <div>
        <h1>お支払い方法</h1>
      </div>
      <div>
        <input type="radio" id="select_card" name="select_pay" />
        <label htmlFor="select_card">クレジットカード</label>
        <input type="radio" id="select_money" name="select_pay" />
        <label htmlFor="select_money">現金</label>
      </div>
    </>
  );
}
