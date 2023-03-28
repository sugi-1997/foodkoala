import styles from 'styles/order_check.module.css';
import useSWR, { useSWRConfig } from 'swr';
import { Fetcher } from '../lib/Fetcher';

export default function DeleteButton({ value }: { value: number }) {
  const { data, error } = useSWR('/api/get_cart_items', Fetcher);
  const { mutate } = useSWRConfig();

  //商品の削除
  const handleDelete = async (clickedId: number) => {
    await fetch(`/api/delete_cart_items?item_id=eq.${clickedId}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: clickedId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    mutate('/api/get_cart_items');
  };

  return (
    <button
      className={styles.delete_button}
      value={value}
      onClick={() => handleDelete(value)}
    >
      削除
    </button>
  );
}
