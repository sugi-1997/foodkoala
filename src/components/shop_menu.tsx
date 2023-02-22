import styles from '../styles/Shop.module.css';

export default function ShopMenu() {
  return (
    <>
      <div className={styles.shop_menu}>
        <div className={styles.shop_detail_menuImg}>
          <p>
            <img src="/images/menu/pizza.food.jpg" alt="画像" />
          </p>
        </div>
        <div className={styles.shop_detail_menuName}>
          <p>{'メニュー1'}</p>
        </div>
        <div className={styles.shop_detail_menuPrice}>
          <p>{'金額'}円</p>
        </div>
      </div>
    </>
  );
}
