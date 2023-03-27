import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { Shop } from 'types/shops';

//favoriteのshop_idからお気に入りのショップ一覧を取得
export function useSetShops(data: any) {
  const [favoriteShops, setFavoriteShops] = useState<Shop[]>([]);
  const userId = Cookies.get('user_id');

  useEffect((): any => {
    if (userId === null || userId === undefined || !data) {
      return;
    } else {
      const getFavoriteShops = async () => {
        const newFavoriteShops: Shop[] = [];
        console.log('data', data);
        for (const fav of data) {
          try {
            const res = await fetch(
              `/api/favorite_shops?id=eq.${fav.shop_id}`
            );
            const data = await res.json();
            newFavoriteShops.push(data[0]);
            console.log(
              'newfavoriteShopsにデータを追加しました',
              newFavoriteShops
            );
          } catch (error) {
            console.error(error);
          }
        }
        setFavoriteShops(newFavoriteShops);
      };
      getFavoriteShops();
    }
  }, [data, userId]);

  return favoriteShops;
}
