import useSWR from 'swr';
import { userId } from 'lib/UserId';
import { Fetcher } from 'lib/Fetcher';

type Data = {
  data: any;
  error: any;
};

//userが登録したお気に入りのshop_idをfavoriteテーブルから取得
export default function getData(): Data {
  const { data, error } = useSWR(
    `/api/favorite?user_id=eq.${userId}`,
    Fetcher,
    {
      revalidateOnMount: true,
    }
  );
  return { data: data, error: error };
}
