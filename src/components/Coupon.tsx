import styles from 'styles/order_check.module.css';
import useSWR from 'swr';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Coupon() {
  const { data, error } = useSWR('/api/coupon', fetcher);

  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <div className={styles.order_list_details}>
      <dl>
        <dt>クーポン</dt>
        <dd>
          <select
            name="coupon-list"
            id="coupon-list"
            onChange={(e) => {
              const selectedCoupon = e.target.value;
              setCoupon(selectedCoupon);
            }}
          >
            <option>--</option>
            {data.map((coupon) => (
              <option key={coupon.couponcode} value={coupon.discount}>
                {coupon.couponcode}
              </option>
            ))}
          </select>
        </dd>
        <dt>容器返却</dt>
        <dd>
          <input type="radio" id="container_true" name="container" />
          する
        </dd>
        <dd>
          <input type="radio" id="container_false" name="container" />
          しない
        </dd>
      </dl>
      <p>値引き合計：{'クーポン金額'}円</p>
    </div>
  );
}
