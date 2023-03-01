//[id]のgetStaticPaths()
type Shop = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  score: number;
  favorite: boolean;
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
