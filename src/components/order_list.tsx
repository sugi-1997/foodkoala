export default function OrderList() {
  return (
    <>
      <div>
        <h1>注文リスト</h1>
      </div>
      <div>
        <div>
          <dl>
            <dt>{'メニュー1'}</dt>
            <dd>{'メニュー1 count'}</dd>
            <dd>
              <button
                onClick={(e) => {
                  '削除';
                }}
              >
                削除
              </button>
            </dd>
            <dt>{'メニュー2'}</dt>
            <dd>{'メニュー2 count'}</dd>
            <dd>
              <button
                onClick={(e) => {
                  '削除';
                }}
              >
                削除
              </button>
            </dd>
            <dt>{'メニュー3'}</dt>
            <dd>{'メニュー3 count'}</dd>
            <dd>
              <button
                onClick={(e) => {
                  '削除';
                }}
              >
                削除
              </button>
            </dd>
          </dl>
          <p>小計：{'合計金額'}円</p>
        </div>
        <div>
          <dl>
            <dt>クーポン</dt>
            <dd>
              <input type="text" />
            </dd>
            <dt>容器返却</dt>
            <dd>
              <input
                type="radio"
                id="container_true"
                name="container"
              />
              する
            </dd>
            <dd>
              <input
                type="radio"
                id="container_false"
                name="container"
              />
              しない
            </dd>
          </dl>
          <p>値引き合計：{'クーポン金額'}円</p>
        </div>
        <div>
          <p>合計：{'合計金額-クーポン金額'}円</p>
        </div>
      </div>
    </>
  );
}
