import useSWR from 'swr';
import { Fetcher } from 'lib/Fetcher';

export function GetScore(id: number): number | undefined {
  const { data, error } = useSWR(
    `/api/score?shop_id=eq.${id}`,
    Fetcher,
    {
      revalidateOnMount: true,
    }
  );

  if (error) return undefined;
  if (!data) return undefined;

  if (data) {
    console.log('data', data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].score;
    }
    const score: number = Number((sum / data.length).toFixed(1));
    console.log('score', score);
    return score;
  }
}

export default function ShopScore({ id }: { id: number }) {
  const score: number | undefined = GetScore(id);
  if (score === undefined) {
    return <div> Failed to Load... </div>;
  } else {
    if (score < 0.5) {
      return (
        <>
          <p>
            {score}
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 1) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 1.5) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 2) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 2.5) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 3) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
          <i className="fa-regular fa-star"></i>
        </>
      );
    } else if (score < 3.5) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 4) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 4.5) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </p>
        </>
      );
    } else if (score < 5) {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star-half-stroke"></i>
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>
            {score}
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </p>
        </>
      );
    }
  }
}
