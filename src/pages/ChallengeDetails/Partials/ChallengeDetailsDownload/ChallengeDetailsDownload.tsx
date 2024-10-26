import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast, ToastContentProps } from 'react-toastify';
import { Button } from '../../../../components/common';
import challengeService from '../../../../services/challengeService';
import BoxContent from '../BoxContent';
import './challengeDetailsDownload.scss';
import { handleDownloadFile } from '../../../../utils/helper';

const ChallengeDetailsDownload = () => {
  const { challengeId } = useParams();
  const { t } = useTranslation();

  if (!challengeId) return;

  const handleDownloadAssets = async () => {
    await toast.promise(
      challengeService
        .downloadAssets({ challengeId })
        .then((response) => {
          const MESSAGE_SUCCESS = t(
            'ToastMessage.Challenger.Download.Assest.Success',
          );

          const fileLink = response.data.data.source.sourceLink;
          if (fileLink) {
            handleDownloadFile(fileLink);
          }
          return MESSAGE_SUCCESS;
        })
        .catch(() => {
          const MESSAGE_ERROR = t(
            'ToastMessage.Challenger.Download.Assest.Error',
          );
          return MESSAGE_ERROR;
        }),
      {
        pending: t('ToastMessage.Challenge.Download.Assets.Pending'),
        success: {
          render: (responseOfSuccess: ToastContentProps<string>) => {
            return responseOfSuccess.data;
          },
        },
        error: {
          render: (responseOfSuccess: ToastContentProps<string>) => {
            return responseOfSuccess.data;
          },
        },
      },
    );
  };

  const handleDownloadFigma = async () => {
    await toast.promise(
      challengeService
        .downloadFigma({ challengeId })
        .then((response) => {
          const MESSAGE_SUCCESS = t(
            'ToastMessage.Challenger.Download.Figma.Success',
          );

          const fileLink = response.data.data.figma.figmaLink;
          if (fileLink) {
            handleDownloadFile(fileLink);
          }
          return MESSAGE_SUCCESS;
        })
        .catch(() => {
          const MESSAGE_ERROR = t(
            'ToastMessage.Challenger.Download.Figma.Error',
          );
          return MESSAGE_ERROR;
        }),
      {
        pending: t('ToastMessage.Challenge.Download.Figma.Pending'),
        success: {
          render: (responseOfSuccess: ToastContentProps<string>) => {
            return responseOfSuccess.data;
          },
        },
        error: {
          render: (responseOfSuccess: ToastContentProps<string>) => {
            return responseOfSuccess.data;
          },
        },
      },
    );
  };
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
          onClick={handleDownloadAssets}
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
          onClick={handleDownloadFigma}
        />
      </BoxContent>
    </div>
  );
};

export default ChallengeDetailsDownload;
