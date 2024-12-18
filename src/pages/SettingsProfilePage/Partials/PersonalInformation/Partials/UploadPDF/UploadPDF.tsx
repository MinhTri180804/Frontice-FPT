import React, { useState } from 'react';
import './uploadPDF.scss';
import { Button } from '../../../../../../components/common';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import authService from '../../../../../../services/authServices';
import { useAuthStore } from '../../../../../../store/authStore';
import { toast } from 'react-toastify';

const UploadPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>();
  const profile = useAuthStore((state) => state.profile);
  const [filePreview, setFilePreview] = useState<string | null>(
    profile?.cv || null,
  );
  const uploadProfile = useAuthStore((state) => state.updateProfile);
  const { t } = useTranslation();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Vui lòng chọn file PDF!');
    }
  };

  const mutationUploadCv = useMutation({
    mutationKey: ['upload-cv'],
    mutationFn: async (cv: File) => await authService.uploadCV(cv),
    onSuccess: async (data) => {
      return await toast.promise(
        authService.updateProfile({ cv: data.data.path }).then(() => {
          if (profile) {
            uploadProfile({ ...profile, cv: data.data.link });
            setFilePreview(data.data.link);
            setFile(null);
          }
        }),
        {
          pending: 'Đang thực hiện cập nhật CV',
          success: 'Cập nhật CV thành công',
          error: 'Cập nhật CV thất bại',
        },
      );
    },
  });

  const handleUpload = async () => {
    if (file) {
      return await toast.promise(mutationUploadCv.mutateAsync(file), {
        pending: 'Đang thực hiện đăng tải CV',
        success: 'Đăng tải CV thành công',
        error: 'Đăng tải CV thất bại',
      });
    }
  };

  const handlePreviewClick = () => {
    if (filePreview) {
      window.open(filePreview, '_blank');
    }
  };

  return (
    <div className="upload-pdf-component">
      <div className="title">{t('UploadCV')}</div>
      <div className="upload-file-container">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <div className="button-group">
          <Button
            label="Upload PDF"
            styleType="primary"
            buttonSize="medium"
            onClick={handleUpload}
            disabled={!file}
          />
          {filePreview && (
            <Button
              label="View CV"
              styleType="secondary"
              buttonSize="medium"
              onClick={handlePreviewClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPDF;
