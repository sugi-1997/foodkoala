import { useEffect, useState } from 'react';

export default function Timer({ date }: { date: Date }) {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [intervalId, setIntervalId] = useState<null | NodeJS.Timer>(
    null
  );

  useEffect(() => {
    const countdown = () => {
      const orderDate = new Date(date);
      const now = new Date();
      //経過時間を表示(ミリ秒)
      const timePassed = now.getTime() - orderDate.getTime();
      //経過時間を秒数に変換
      const secondPassed = timePassed / 1000;
      //15分(900秒)経過後にタイマーを終了
      if (secondPassed > 900) return;
      //15分から経過時間を引いた残り時間を計算
      const remainTime = 900 - secondPassed;
      const remainMinute = Math.floor(remainTime / 60);
      const remainSecond = Math.floor(remainTime - remainMinute * 60);
      setMinute(remainMinute);
      setSecond(remainSecond);
    };

    if (intervalId === null) {
      setIntervalId(setInterval(countdown, 1000));
    }
  }, [date, intervalId]);

  if (minute > 0 || second > 0) {
    return (
      <div>
        <p>お受け取り可能時間まで</p>
        <h2>
          {minute}分{second}秒
        </h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>注文した商品が出来上がりました！</h2>
      </div>
    );
  }
}
