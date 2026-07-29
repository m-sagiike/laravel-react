import './MoodForm.css';
import {useState } from 'react';

function MoodForm() {
  const [conditionScore, setConditionScore] = useState(null);

    return (
      <div>
        <h1>今日の調子</h1>

        <div>
          <label>日付</label>
          <br />
          <input type="date" />
        </div>

        <br />

        <div>
          <label>今日の調子</label>
          <br />
          <div>
            <button type="button" className={conditionScore === 5 ? "selected" : ""} onClick={() => setConditionScore(5)}>
              <div>😊</div>
              <div>とても良い</div>
            </button>

            <button type="button" className={conditionScore === 4 ? "selected" : ""} onClick={() => setConditionScore(4)}>
              <div>😀</div>
              <div>良い</div>
            </button>

            <button type="button" className={conditionScore === 3 ? "selected" : ""} onClick={() => setConditionScore(3)}>
              <div>😐</div>
              <div>普通</div>
            </button>

            <button type="button" className={conditionScore === 2 ? "selected" : ""} onClick={() => setConditionScore(2)}>
              <div>😟</div>
              <div>悪い</div>
            </button>

            <button type="button" className={conditionScore === 1 ? "selected" : ""} onClick={() => setConditionScore(1)}>
              <div>😢</div>
              <div>とても悪い</div>
            </button>
          </div>
          <p>選択中：{conditionScore}</p>
        </div>

        <br />

        <div>
          <label>メモ</label>
          <br />
          <textarea rows="5" cols="40"></textarea>
        </div>

        <br />

        <button>登録</button>
      </div>
    );
}

export default MoodForm;