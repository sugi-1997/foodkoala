import styles from '../../styles/Shop.module.css';
import { Shop } from 'types/shops';
import { useState } from 'react';

export default function favoriteButton(shop: Shop) {
  const [favorite, setFavorite] = useState(shop.favorite);

  function handleClick() {
    fetch(`/api/favorite?shop_id=eq.${shop.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite: !favorite,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setFavorite(!favorite);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      {favorite ? (
        <div className={styles.shop_favorite_true}>
          <button type="button" onClick={handleClick}>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      ) : (
        <div className={styles.shop_favorite_false}>
          <button type="button" onClick={handleClick}>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      )}
    </>
  );
}
