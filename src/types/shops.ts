//[id]のgetStaticPaths()
type Shop = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  score: number;
  genre_id: number;
  area_id: number;
  review_1: string;
  review_2: string;
  review_3: string;
};
export type { Shop };

//[id]のgetStaticProps()
type GetStaticProps = {
  params: { id: string };
};
export type { GetStaticProps };

//[id]のShopDetail()
type ShopProps = {
  shopData: Shop[];
};
export type { ShopProps };

//[id]のShopMenu()
type Menu = {
  id: number;
  image_url: string;
  name: string;
  price: number;
};
export type { Menu };

//favorite_buttonのFavoriteButton()
type User = {
  id: number;
  shop_id_1: boolean;
  shop_id_2: boolean;
  shop_id_3: boolean;
  shop_id_4: boolean;
  shop_id_5: boolean;
  shop_id_6: boolean;
  shop_id_7: boolean;
  shop_id_8: boolean;
  shop_id_9: boolean;
  shop_id_10: boolean;
  shop_id_11: boolean;
  shop_id_12: boolean;
  shop_id_13: boolean;
};

export type { User };
