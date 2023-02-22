export default function Option() {
  return (
    <>
      <h1>オプション</h1>
      <ul>
        <li>
          <label htmlFor="chop_count">お箸</label>
          <select name="count" id="chop_count">
            <option value="none">なし</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">削除</button>
        </li>
        <li>
          <label htmlFor="fork_count">フォーク</label>
          <select name="count" id="fork_count">
            <option value="none">なし</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">削除</button>
        </li>
        <li>
          <label htmlFor="spoon_count">スプーン</label>
          <select name="count" id="spoon_count">
            <option value="none">なし</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">削除</button>
        </li>
        <li>
          <label htmlFor="tissue_count">おしぼり</label>
          <select name="count" id="tissue_count">
            <option value="none">なし</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">削除</button>
        </li>
      </ul>
    </>
  );
}
