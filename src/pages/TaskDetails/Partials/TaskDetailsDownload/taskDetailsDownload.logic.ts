import { useTranslation } from 'react-i18next';
import { toast, ToastContentProps } from 'react-toastify';
import taskService from '../../../../services/taskService';
import {
  IDownloadAssetsTaskParams,
  IDownloadFigmaTaskParams,
} from '../../../../types/request/task';
import { handleDownloadFile } from '../../../../utils/helper';

interface IHandleDownloadAssetsMethod {
  params: IDownloadAssetsTaskParams;
}

interface IHandleDownloadFigmaMethod {
  params: IDownloadFigmaTaskParams;
}

const useTaskDetailsDownloadLogic = () => {
  const { t } = useTranslation();
  const handleDownloadAssets = async (
    params: IHandleDownloadAssetsMethod['params'],
  ) => {
    return await toast.promise(
      taskService
        .downloadSource({ taskId: params.taskId })
        .then((response) => {
          const MESSAGE_SUCCESS = t(
            'ToastMessage.Challenger.Download.Assest.Success',
          );
          const fileLink = response.data.sourceLink;
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
      taskService
        .downloadFigma({ taskId: params.taskId })
        .then((response) => {
          const MESSAGE_SUCCESS = t(
            'ToastMessage.Challenger.Download.Figma.Success',
          );

          const fileLink = response.data.figmaLink;
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

export default useTaskDetailsDownloadLogic;
