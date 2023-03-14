import Logout from './Logout';
import { render, fireEvent } from '@testing-library/react';
import Cookies from 'js-cookie';

describe('Loguout is function', () => {
  it('logout-function is called when clicked', () => {
    //routerのモック
    const mockRouter = {
      replace: jest.fn(),
    };

    jest
      .spyOn(require('next/router'), 'useRouter')
      .mockReturnValue(mockRouter);

    //js-cookieのモック
    const mockCookies = {
      remove: jest.fn(),
    };

    jest
      .spyOn(require('js-cookie'), 'remove')
      .mockReturnValue(mockCookies);

    //ボタンのクリックイベント
    const { getByText } = render(
      <Logout className="logout-button" />
    );

    const logoutButton = getByText('ログアウト');
    fireEvent.click(logoutButton);

    //cookieがremoveされ、/loginにリダイレクトするかの確認
    expect(Cookies.remove).toHaveBeenCalledWith('user_id');
    expect(mockRouter.replace).toHaveBeenCalledWith('/login');
  });
});
