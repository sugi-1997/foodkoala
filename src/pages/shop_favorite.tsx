import ShopName from '../components/shop_name';
import ShopMenu from '../components/shop_menu';

export default function ShopFavorite() {
  return (
    <>
      <div className="shopFavorite_name">
        <ShopName />
      </div>
      <div className="shopFavorite_menu">
        <ShopMenu />
      </div>
    </>
  );
}
