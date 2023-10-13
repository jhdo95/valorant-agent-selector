
export default function Quiz({ quizData, currentQuestion, onAnswer, onNext, onPrevious, answers }) {
    const question = quizData[currentQuestion];
    const selectedAnswer = answers[question] || null;

    return (
        <div>
            <h2>{question.question}</h2>
            <div>
                {question.choices.map((choice, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="radio"
                                name="answer"
                                value={choice.text}
                                checked={selectedAnswer === choice.text}
                                onChange={() => onAnswer(question, choice)}
                            />
                            {choice.text}
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={onPrevious} disabled={currentQuestion === 0}>
                Previous
            </button>
            <button onClick={onNext}>
                {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
    );
}