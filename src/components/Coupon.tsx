import { useState } from 'react';
import styles from 'styles/order_check.module.css';
import useSWR from 'swr';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Coupon(props: { subTotal: number }) {
  const [coupon, setCoupon] = useState('');
  const { data, error } = useSWR('/api/coupon', fetcher);

  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;

  console.log('coupon', data);
  console.log('subtotal', props.subTotal);

  const calcDiscount = (props.subTotal * Number(coupon)) / 100;

  return (
    <>
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
              <option value={0}>--</option>
              {data.map((coupon: Coupon) => (
                <option
                  key={coupon.couponcode}
                  value={coupon.discount}
                >
                  {coupon.couponcode}
                </option>
              ))}
            </select>
          </dd>
          <dt>容器返却</dt>
          <p>
            前回使った容器を返却すると次回使えるクーポンをプレゼント!
          </p>
          <dd>
            <input
              type="radio"
              id="container_true"
              name="container"
            />
            する
          </dd>
          <dd>
            <input
              type="radio"
              id="container_false"
              name="container"
            />
            しない
          </dd>
        </dl>
        <p>値引き合計：{calcDiscount}円</p>
      </div>
      <div>
        <p>合計：{props.subTotal - calcDiscount}円</p>
      </div>
    </>
  );
}

type Coupon = {
  user_id: number;
  couponcode: string;
  discount: number;
};
