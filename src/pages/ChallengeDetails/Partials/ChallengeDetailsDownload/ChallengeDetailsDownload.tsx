import { useParams } from 'react-router-dom';
import { Button } from '../../../../components/common';
import BoxContent from '../BoxContent';
import useChallengeDetailsDownloadLogic from './challengeDetailsDownload.logic';
import './challengeDetailsDownload.scss';

const ChallengeDetailsDownload = () => {
  const { challengeId } = useParams();
  const { handleDownloadAssets, handleDownloadFigma } =
    useChallengeDetailsDownloadLogic();

  if (!challengeId) return;

  return (
    <div className="challenge__details-download-tab">
      <BoxContent
        title="🗂️ Download based files"
        className="download__based-files"
      >
        <p>
          Includes assets, JPG images of the design files, and a basic style
          guide. There’s also a README to help you get started.
        </p>

        <Button
          label="Download starter"
          styleType="primary"
          buttonSize="normal"
          onClick={() => handleDownloadAssets({ challengeId })}
        />
      </BoxContent>
      <BoxContent
        title="📑 Download design file"
        className="download__design-file"
      >
        <p>
          All of our designs are available as Figma files. Using the design file
          will help you build more accurate solutions.
        </p>

        <Button
          label="Download design"
          styleType="primary"
          buttonSize="normal"
          onClick={() => handleDownloadFigma({ challengeId })}
        />
      </BoxContent>
    </div>
  );
};

export default ChallengeDetailsDownload;
