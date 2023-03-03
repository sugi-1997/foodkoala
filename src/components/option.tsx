import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styles from 'styles/order_check.module.css';

export default function Option() {
  const [itemId, setItemId] = useState<ItemId[]>([]);
  const userId = Cookies.get('user_id');

  //cart_itemsテーブルからデータを取得
  useEffect(() => {
    async function getItemId() {
      await fetch('/api/get_cart_items')
        .then((res) => res.json())
        .then((data) => {
          setItemId(data);
        });
    }
    getItemId();
  }, []);

  //optionChopのデータをcartsテーブルにPATCH
  const patchOptionChop = async (optionCount: number) => {
    await fetch(`/api/patch_carts?user_id=eq.${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chopstick: optionCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  //optionFolkのデータをcartsテーブルにPATCH
  const patchOptionFolk = async (optionCount: number) => {
    await fetch(`/api/patch_carts?user_id=eq.${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folk: optionCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  //optionSpoonのデータをcartsテーブルにPATCH
  const patchOptionSpoon = async (optionCount: number) => {
    await fetch(`/api/patch_carts?user_id=eq.${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spoon: optionCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  //optionOshiboriのデータをcartsテーブルにPATCH
  const patchOptionOshibori = async (optionCount: number) => {
    await fetch(`/api/patch_carts?user_id=eq.${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oshibori: optionCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1>オプション</h1>
      <div className={styles.option}>
        <ul>
          <li>
            <label htmlFor="chop_count">お箸</label>
            <select
              name="count"
              id="chop_count"
              onChange={(e) => {
                const selectedOption = e.target.value;
                patchOptionChop(Number(selectedOption));
              }}
            >
              <option value={0}>なし</option>
              {itemId.map((item, index) => (
                <option key={item.id} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="fork_count">フォーク</label>
            <select
              name="count"
              id="fork_count"
              onChange={(e) => {
                const selectedOption = e.target.value;
                patchOptionFolk(Number(selectedOption));
              }}
            >
              <option value={0}>なし</option>
              {itemId.map((item, index) => (
                <option key={item.id} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="spoon_count">スプーン</label>
            <select
              name="count"
              id="spoon_count"
              onChange={(e) => {
                const selectedOption = e.target.value;
                patchOptionSpoon(Number(selectedOption));
              }}
            >
              <option value={0}>なし</option>
              {itemId.map((item, index) => (
                <option key={item.id} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="tissue_count">おしぼり</label>
            <select
              name="count"
              id="tissue_count"
              onChange={(e) => {
                const selectedOption = e.target.value;
                patchOptionOshibori(Number(selectedOption));
              }}
            >
              <option value={0}>なし</option>
              {itemId.map((item, index) => (
                <option key={item.id} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </>
  );
}

type ItemId = {
  id: number;
  item_id: number;
  cart_id: number;
};
