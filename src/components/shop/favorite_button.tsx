import styles from '../../styles/Shop.module.css';
import type { Shop } from 'types/shops';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function FavoriteButton({ shop }: { shop: Shop }) {
  const [heart, setHeart] = useState('shop_favorite_false');
  const userId = Cookies.get('user_id');
  //ページ遷移時にログイン前の場合はお気に入りボタンをグレーに。ログイン後の場合はshop_idとuser_idが一致するデータがfavoriteテーブルに存在するか確認してCSSを切り替え。
  useEffect((): any => {
    if (userId === undefined || userId === null) {
      setHeart('shop_favorite_false');
    } else {
      fetch(
        `http://localhost:8000/favorite?shop_id=eq.${shop.id}&user_id=eq.${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setHeart('shop_favorite_false');
          } else {
            setHeart('shop_favorite_true');
          }
        });
    }
  }, [shop.id, userId]);

  //ログイン前はonClickでボタンのCSSを切り替え。ログイン後はcheckFavoriteを呼び出し
  function handleClick() {
    if (userId === undefined || userId === null) {
      if (heart === 'shop_favorite_true') {
        setHeart('shop_favorite_false');
      } else if (heart === 'shop_favorite_false') {
        console.log('false');
        setHeart('shop_favorite_true');
      }
    } else {
      checkFavorite();
    }
  }

  //shop_idとuser_idが一致するデータがfavoriteテーブルに存在するか確認。→POSTかDELETE
  function checkFavorite() {
    fetch(
      `http://localhost:8000/favorite?shop_id=eq.${shop.id}&user_id=eq.${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          postFavorite();
        } else {
          deleteFavorite();
        }
      });
  }

  //favoriteテーブルに登録（shop_id&user_id)してボタンのCSSをsetHeart
  function postFavorite() {
    fetch(`/api/favorite_post?shop_id=eq.${shop.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_id: shop.id,
        user_id: userId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setHeart('shop_favorite_true');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //favoriteテーブルから削除（shop_id&user_id)してボタンのCSSをsetHeart
  function deleteFavorite() {
    fetch(`/api/favorite_delete?shop_id=eq.${shop.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setHeart('shop_favorite_false');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //ハートボタンの表示
  return (
    <>
      <div className={styles[heart]}>
        <button type="button" onClick={handleClick}>
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>
    </>
  );
}
