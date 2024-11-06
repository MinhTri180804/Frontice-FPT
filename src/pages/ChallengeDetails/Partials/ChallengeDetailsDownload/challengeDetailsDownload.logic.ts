import { toast, ToastContentProps } from 'react-toastify';
import { IChallengeDownloadFileParams } from '../../../../types/request/challenge';
import challengeService from '../../../../services/challengeService';
import { useTranslation } from 'react-i18next';
import { handleDownloadFile } from '../../../../utils/helper';

interface IHandleDownloadAssetsMethod {
  params: IChallengeDownloadFileParams;
}

interface IHandleDownloadFigmaMethod {
  params: IChallengeDownloadFileParams;
}

const useChallengeDetailsDownloadLogic = () => {
  const { t } = useTranslation();
  const handleDownloadAssets = async (
    params: IHandleDownloadAssetsMethod['params'],
  ) => {
    return await toast.promise(
      challengeService
        .downloadAssets({ challengeId: params.challengeId })
        .then((response) => {
          const MESSAGE_SUCCESS = t(
            'ToastMessage.Challenger.Download.Assest.Success',
          );

          const fileLink = response.data.source.sourceLink;
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

  const handleDownloadFigma = async (
    params: IHandleDownloadFigmaMethod['params'],
  ) => {
    return await toast.promise(
      challengeService
        .downloadFigma({ challengeId: params.challengeId })
        .then((response) => {
          const MESSAGE_SUCCESS = t(
            'ToastMessage.Challenger.Download.Figma.Success',
          );

          const fileLink = response.data.figma.figmaLink;
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

  return { handleDownloadAssets, handleDownloadFigma };
};

export default useChallengeDetailsDownloadLogic;
