import type { Shop } from 'types/shops';
import NoFavorite from 'components/shop/no_favorite';
import NoLoginFavorite from 'components/shop/no_login_favorite';
import LoadingFavorite from 'components/shop/loading_favorite';
import { userId } from 'lib/UserId';
import getData from 'lib/favorite/getData';
import { useSetShops } from 'lib/favorite/setShops';
import Favorite from 'components/shop/favorite';

export default function ShopFavorite() {
  const { data, error } = getData();

  //favoriteのshop_idからお気に入りのショップ一覧を取得
  const favoriteShops: Shop[] = useSetShops(data);

  if (error) return <div>Error...</div>;

  if (!data) {
    return <LoadingFavorite />;
  }

  if (userId === null || userId === undefined) {
    return <NoLoginFavorite />;
  }

  if (favoriteShops.length === 0) {
    return <NoFavorite />;
  }

  return <Favorite favoriteShops={favoriteShops} />;
}
