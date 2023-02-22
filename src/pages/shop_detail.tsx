import ShopName from '../components/shop_name';
import ShopReview from '../components/shop_review';
import ShopMenu from '../components/shop_menu';

export default function ShopDetail() {
  return (
    <>
      <div>
        <ShopName />
      </div>
      <div>
        <ShopMenu />
      </div>
      <div>
        <ShopReview />
      </div>
    </>
  );
}
