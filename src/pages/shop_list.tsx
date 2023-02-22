import ShopName from '../components/shop_name';
import ShopMenu from '../components/shop_menu';

export default function ShopList() {
  return (
    <>
      <div className="shopList_name">
        <ShopName />
      </div>
      <div className="shopList_menu">
        <ShopMenu />
      </div>
    </>
  );
}
