import { FC } from 'react';
import './questionAnswer.scss';

interface IQuestionAnswerProps {
  questionAnswerData: {
    title: string;
    answer: string;
  };
}

const QuestionAnswer: FC<IQuestionAnswerProps> = ({ questionAnswerData }) => {
  const { title, answer } = questionAnswerData;
  return (
    <div className="question__answer-component">
      <div className="question">{title}</div>
      <div className="answer">{answer}</div>
    </div>
  );
};

export default QuestionAnswer;
