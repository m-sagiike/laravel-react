function MoodList() {

    const moods = [
        {
            id: 1,
            record_date: '2026-08-06',
            mood_score: 4,
            condition_score: 3,
            memo: '散歩した'
        },
        {
            id: 2,
            record_date: '2026-08-05',
            mood_score: 2,
            condition_score: 2,
            memo: '疲れた'
        }
    ];

    return (
        <div>
            <h1>気分一覧</h1>

            {moods.map((mood) => (
                <div key={mood.id}>
                    <p>日付：{mood.record_date}</p>
                    <p>気分：{mood.mood_score}</p>
                    <p>体調：{mood.condition_score}</p>
                    <p>メモ：{mood.memo}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default MoodList;