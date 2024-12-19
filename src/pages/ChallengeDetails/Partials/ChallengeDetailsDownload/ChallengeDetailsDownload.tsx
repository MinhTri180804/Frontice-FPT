import { useParams } from 'react-router-dom';
import { Button } from '../../../../components/common';
import BoxContent from '../BoxContent';
import useChallengeDetailsDownloadLogic from './challengeDetailsDownload.logic';
import './challengeDetailsDownload.scss';
import { useTranslation } from 'react-i18next';

const ChallengeDetailsDownload = () => {
  const { t } = useTranslation();
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
        <p>{t('DownloadBasedFilesDescription')}</p>

        <Button
          label={t('DownloadStarter')}
          styleType="primary"
          buttonSize="normal"
          onClick={() => handleDownloadAssets({ challengeId })}
        />
      </BoxContent>
      <BoxContent
        title="📑 Download design file"
        className="download__design-file"
      >
        <p>{t('DownloadDesignFileDescription')}</p>

        <Button
          label={t('DownloadDesign')}
          styleType="primary"
          buttonSize="normal"
          onClick={() => handleDownloadFigma({ challengeId })}
        />
      </BoxContent>
    </div>
  );
};

export default ChallengeDetailsDownload;
