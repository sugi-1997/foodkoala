// 2.ランダムな10文字を生成（注文コード）

const OrderCode = async () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 1; i <= 10; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const code = str;
  return {
    code,
  };
};

export { OrderCode };
