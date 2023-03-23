import styles from '../styles/Shop.module.css';
import Image from 'next/image';
import { Review } from 'types/review';
import useSWR from 'swr';
import { Fetcher } from 'lib/Fetcher';

export default function ShopReview({ id }: { id: number }) {
  //レビューのコアラアイコン
  function koalaIcon() {
    return (
      <div className={styles.shop_id_review_img}>
        <Image
          src="/images/foodkoala_logo.png"
          alt="コアラ"
          width={50}
          height={50}
        />
      </div>
    );
  }

  const { data, error } = useSWR(
    `/api/review?shop_id=eq.${id}`,
    Fetcher,
    {
      revalidateOnMount: true,
    }
  );

  if (error) return <div>Fail to Laod...</div>;
  if (!data) return <div>Loading...</div>;

  function getRev() {
    const review = [];
    for (let i = data.length - 1; i >= data.length - 3; i--) {
      review.push(data[i]);
    }
    return review;
  }
  const rev = getRev();

  console.log('revdata', data);
  console.log('rev', rev);
  return (
    <>
      <div className={styles.shopDetail_review}>
        <p className={styles.shop_id_review_title}>
          <span>
            <i className="fa-solid fa-face-laugh"></i>
            &nbsp;みんなのレビュー
          </span>
        </p>
        {rev.map((rev: Review) => (
          <>
            <div className={styles.shop_review}>
              {koalaIcon()}
              <div className={styles.shop_id_review}>
                {rev.review}
              </div>
            </div>
            <br />
          </>
        ))}
      </div>
    </>
  );
}
