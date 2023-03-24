import useSWR from 'swr';
import Cookies from 'js-cookie';
import { Fetcher } from 'lib/Fetcher';

type Data = {
  data: any;
  error: any;
};

//userが登録したお気に入りのshop_idをfavoriteテーブルから取得
export default function GetData(): Data {
  const userId = Cookies.get('user_id');
  const { data, error } = useSWR(
    `/api/favorite?user_id=eq.${userId}`,
    Fetcher,
    {
      revalidateOnMount: true,
    }
  );
  return { data: data, error: error };
}
