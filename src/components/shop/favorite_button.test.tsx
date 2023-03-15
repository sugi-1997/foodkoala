import { screen, render } from '@testing-library/react';
import FavoriteButton from 'components/shop/favorite_button';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from '../../styles/Shop.module.css';
import { Shop } from 'types/shops';
import { useRouter } from 'next/router';
import { userId } from 'lib/UserId';

describe('favorite_button', () => {
  it('ログイン前に押されたらログインページへ', () => {
    const mockRouter = {
      replace: jest.fn(),
    };
    jest
      .spyOn(require('next/router'), 'useRouter')
      .mockReturnValue(mockRouter);
    expect(mockRouter.replace).toHaveBeenCalledWith('/login');
  });
  // it('お気に入りでない時はお気に入りを登録してハートを赤に',()=>{

  // })
  // it('お気に入りの時はお気に入りを削除してハートをグレーに',()=>{

  // })
});
