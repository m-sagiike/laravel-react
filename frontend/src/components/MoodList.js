import { useEffect, useState } from 'react';
import API_BASE_URL from "../api/client";

function MoodList() {
    const [moods, setMoods] = useState([]);

    useEffect(() => {
      fetch(`${API_BASE_URL}/moods`)
        .then((response) => response.json())
        .then((data) => {
          setMoods(data);
        });
    }, []);

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