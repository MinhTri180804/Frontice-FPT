import { useParams } from 'react-router-dom';
import { Button } from '../../../../components/common';
import './taskDetailsDownload.scss';
import { BoxContent } from '../../../ChallengeDetails/Partials';
import useTaskDetailsDownloadLogic from './taskDetailsDownload.logic';
import { useTranslation } from 'react-i18next';

const TaskDetailsDownload = () => {
  const { t } = useTranslation();
  const { taskId } = useParams();
  const { handleDownloadAssets, handleDownloadFigma } =
    useTaskDetailsDownloadLogic();

  if (!taskId) return;

  return (
    <div className="challenge__details-download-tab">
      <BoxContent
        title={`🗂️ ${t('DownloadBasedFiles')}`}
        className="download__based-files"
      >
        <p>{t('DownloadBasedFilesDescription')}</p>

        <Button
          label={t('DownloadStarter')}
          styleType="primary"
          buttonSize="normal"
          onClick={() => handleDownloadAssets({ taskId })}
        />
      </BoxContent>
      <BoxContent
        title={`📑 ${t('DownloadDesignFile')}`}
        className="download__design-file"
      >
        <p>{t('DownloadDesignFileDescription')}</p>

        <Button
          label={t('DownloadDesign')}
          styleType="primary"
          buttonSize="normal"
          onClick={() => handleDownloadFigma({ taskId })}
        />
      </BoxContent>
    </div>
  );
};

export default TaskDetailsDownload;
