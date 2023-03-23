import styles from '../../styles/Shop.module.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

const userId = Cookies.get('user_id');
export default function ReviewForm({ id }: { id: number }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [score, setScore] = useState('');
  const [review, setReview] = useState('');
  const [image_url, setImage] = useState('');

  function handleClick() {
    fetch('/api/post_review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id: id,
        review: review,
        user_id: userId,
        name: name,
        date: date,
        image_url: image_url,
        score: score,
      }),
    });
  }

  if (userId === null || userId === undefined) {
    return (
      <>
        <div className={styles.review_form}>
          <p className={styles.review_form_title}>
            <span>
              <i className="fa-solid fa-face-laugh"></i>
              &nbsp;レビュー投稿
            </span>
          </p>
          <div className={styles.review}>
            <div className={styles.not_review}>
              レビューの投稿にはログインをしてください。
            </div>
            <Link href={'/login'} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p className={styles.review_form_title}>
          <span>
            <i className="fa-solid fa-face-laugh"></i>
            &nbsp;レビュー投稿
          </span>
        </p>
        <div className={styles.review_form}>
          <form
            action="#"
            method="POST"
            className={styles.review}
            onSubmit={handleClick}
          >
            <div className={styles.review_forms}>
              <div className={styles.review_forms_name}>
                <input
                  type="text"
                  name="name"
                  placeholder="ニックネーム（投稿に表示されます）"
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <div className={styles.review_forms_flexbox}>
                <div className={styles.review_forms_date}>
                  <label htmlFor="date">購入日</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="date"
                    name="date"
                    onChange={(e) => setDate(e.currentTarget.value)}
                  />
                </div>
                <div className={styles.review_forms_score}>
                  <label htmlFor="score">スコア</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    name="score"
                    onChange={(e) => setScore(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className={styles.review_forms_review}>
                <textarea
                  name="review"
                  cols={50}
                  rows={5}
                  placeholder="レビューを入力してください"
                  onChange={(e) => setReview(e.currentTarget.value)}
                />
              </div>
              <div className={styles.review_forms_img}>
                <input
                  type="file"
                  accept="image/jpg,image/png"
                  name="img_url"
                  onChange={(e) => setImage(e.currentTarget.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className={styles.review_forms_button}
            >
              送信
            </button>
          </form>
        </div>
      </>
    );
  }
}
