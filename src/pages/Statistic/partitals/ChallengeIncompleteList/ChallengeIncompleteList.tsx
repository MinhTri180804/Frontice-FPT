import { FC } from 'react';
import 'swiper/scss';
import 'swiper/scss/grid';
import 'swiper/scss/pagination';
import ChallengeIncomplete from '../ChallengeIncomplete/ChallengeIncomplete';
import './challengeIncompleteList.scss';

const ChallengeIncompleteList: FC = () => {
  return (
    <div className="challenge__incomplete-list--component">
      {Array.from({ length: 6 }).map((_, index) => (
        <ChallengeIncomplete
          key={`${index}`}
          className="challenge__incomplete"
          name="Link-sharing app"
          technicalList={['html', 'css']}
          difficulty="High"
          level="Diamond"
          score={125}
          imageURL="https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/thypgk1nmxm4modj1wdl.jpg"
        />
      ))}
    </div>
  );
};

export default ChallengeIncompleteList;
