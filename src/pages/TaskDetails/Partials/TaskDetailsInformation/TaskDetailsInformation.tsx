import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import './taskDetailsInformation.scss';
import { BoxContent } from '../../../ChallengeDetails/Partials';

const TaskDetailsInformation: FC = () => {
  return (
    <div className="challenge__details-information-tab">
      <div className="left">
        <BoxContent title="📜 Brief">
          <p style={{ lineHeight: '180%' }}>
            Your challenge is to build this bento grid and make it as close to
            the design as possible. You can use any tools you like to help you
            complete the challenge. So, if you have something you'd like to
            practice, feel free to give it a go. Your users should be able to:
            View the optimal layout for the interface depending on their
            device's screen size Download the project and go through the
            README.md file. This will provide further details about the project
            and help you set it up. Want some support on the challenge? Join our
            community and ask questions in the help channel.
          </p>
        </BoxContent>
      </div>
      <div className="right">
        <BoxContent title="🗃️ Assets provided">
          <div className="list__assets-provided">
            <AssetsItem
              value="Figma design file access - Unlock with Pro"
              isHave={true}
            />
            <AssetsItem
              value="JPEG design files for mobile & desktop layouts"
              isHave
            />
            <AssetsItem value="Style guide for fonts, colors, etc." isHave />
            <AssetsItem value="Optimized image assets" isHave />
            <AssetsItem value="README file to help you get started" isHave />
            <AssetsItem value="HTML file with pre-written content" isHave />
          </div>
        </BoxContent>

        <BoxContent title="✉️ Message for you">
          <ol style={{ lineHeight: '170%' }}>
            <li>
              1. Most font sizes in this design change from mobile to desktop.
              Take this opportunity to practice scaling text sizes as the screen
              size increases.
            </li>
            <li>
              2. Train your eye for detail by making your solution look similar
              to the design.
            </li>
          </ol>
        </BoxContent>
      </div>
    </div>
  );
};

interface IAssetsItemProps {
  isHave: boolean;
  value: string;
}

function AssetsItem({ isHave, value }: IAssetsItemProps) {
  return (
    <div className="assets__item-component">
      <div className="icon">
        {isHave && <CheckIcon width={24} height={24} color="#1CBD74" />}
        {!isHave && <XMarkIcon width={24} height={24} color="#EA5B33" />}
      </div>

      <div className="value">{value}</div>
    </div>
  );
}

export default TaskDetailsInformation;
