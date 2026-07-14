function MoodForm() {
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
            <button type="button">
              <div>😊</div>
              <div>とても良い</div>
            </button>

            <button type="button">
              <div>😀</div>
              <div>良い</div>
            </button>

            <button type="button">
              <div>😐</div>
              <div>普通</div>
            </button>

            <button type="button">
              <div>😟</div>
              <div>悪い</div>
            </button>

            <button type="button">
              <div>😢</div>
              <div>とても悪い</div>
            </button>
          </div>
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