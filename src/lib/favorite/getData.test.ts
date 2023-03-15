import getData from './getData';
import '@testing-library/jest-dom';
import useSWR from 'swr';

jest.mock('swr');
describe('お気に入りデータを取得する', () => {
  it('データをGETできる', () => {
    //仮のデータ
    const mockData = [{ shop_id: 1, user_id: 1 }];
    const userId = mockData[0].user_id;
    //fetchした時のレスポンス
    const mockFetcher = (res: any) => res.json();
    //useSWRが返すデータ
    (useSWR as jest.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
    });
    //getDataの呼び出し
    const { data, error } = getData();
    //useSWRの呼び出し
    useSWR(`/api/favorite?user_id=eq.${userId}`, mockFetcher, {
      revalidateOnMount: true,
    });
    //getDataのdataとmockDataが一致していると想定
    expect(data).toEqual(mockData);
    //getDataのerrorはundefinedと想定
    expect(error).toBeUndefined();
    //useSWRで呼び出される内容
    expect(useSWR).toHaveBeenCalledWith(
      `/api/favorite?user_id=eq.${userId}`,
      mockFetcher,
      {
        revalidateOnMount: true,
      }
    );
  });
});
