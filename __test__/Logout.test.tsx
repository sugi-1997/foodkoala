import Logout from '../src/lib/Logout';
import { render, fireEvent } from '@testing-library/react';
import Cookies from 'js-cookie';

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

describe('Loguout is function', () => {
  it('logout-function is called when clicked', () => {
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
