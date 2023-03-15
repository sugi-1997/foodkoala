import { screen, render } from '@testing-library/react';
import FavoriteButton from 'components/shop/favorite_button';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from '../../styles/Shop.module.css';
import { Shop } from 'types/shops';
import { useRouter } from 'next/router';
import { userId } from 'lib/UserId';

describe('favorite_button', () => {
  it('Get favorite button status', () => {
    const [heart, setHeart] = useState('shop_favorite_false');
    useEffect(() => {
      if (userId === undefined || userId === null) {
        setHeart('shop_favorite_false');
      } else {
      }
    });
  });
  expect(userId === undefined).toBe(setHeart('shop_favorite_false'));
});

// describe('favorite_button', () => {
//   it('Favorite button to be false when render', () => {
//     const [heart, setHeart] = useState('shop_favorite_false');
//
//     const shop = {
//       id: 1,
//       name: '食堂麒麟',
//       description:
//         '和食の伝統的な味わいと季節感を大切にしています。素材にこだわり、出汁や調味料はすべて手作りで、心を込めた料理を提供しています。',
//       image_url: '/images/shop/shokudo.shop.jpg',
//       score: 3.7,
//       genre_id: 2,
//       area_id: 1,
//       deleted_at: null,
//       review_1: '本格的な味を家で味わえてとても贅沢です。',
//       review_2: '彩りもとても綺麗で、テンションが上がりました。',
//       review_3: '出汁のきいたうどんがとても美味しかったです。',
//     };

//     useEffect((): any => {
//       if (userId === undefined || userId === null) {
//         setHeart('shop_favorite_false');
//       } else {
//         fetch(
//           `http://localhost:8000/favorite?shop_id=eq.${shop.id}&user_id=eq.${userId}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.length === 0) {
//               setHeart('shop_favorite_false');
//             } else {
//               setHeart('shop_favorite_true');
//             }
//           });
//       }
//     }, [shop.id, userId]);
//     expect(userId === undefined).toBe(
//       setHeart('shop_favorite_false')
//     );
//   });
// });
