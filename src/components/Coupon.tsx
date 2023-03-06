import Cookies from 'js-cookie';
import { useState } from 'react';
import styles from 'styles/order_check.module.css';
import useSWR from 'swr';

const fetcher = async (resource: string) => {
  const res = await fetch(resource);
  const data = await res.json();
  return data;
};

export default function Coupon(props: { subTotal: number }) {
  const [coupon, setCoupon] = useState('');
  const userId = Cookies.get('user_id');
  const { data, error } = useSWR(
    `/api/coupon?user_id=eq.${userId}`,
    fetcher
  );

  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;

  const calcDiscount = (props.subTotal * Number(coupon)) / 100;
  const calcTotal = props.subTotal - calcDiscount;

  //クーポンのdiscountをcartsデータにPATCHする
  const patchCoupon = async (selectedDiscount: number) => {
    await fetch(`/api/patch_carts?user_id=eq.${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: Number(userId),
        coupon: selectedDiscount,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>クーポン</h2>
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
                patchCoupon(Number(selectedCoupon));
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
        <h2>合計：{calcTotal}円</h2>
      </div>
    </>
  );
}

type Coupon = {
  user_id: number;
  couponcode: string;
  discount: number;
};
