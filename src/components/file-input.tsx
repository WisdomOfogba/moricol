"use client";

import React, { useState } from "react";
import { BiDownload, BiUpload } from "react-icons/bi";

interface FileAttachmentProps {
  title: string;
  onUpload?: (file: File) => void;
  onDownload?: () => void;
  downloadUrl?: string;
  acceptedFileTypes?: string;
}

const FileInput: React.FC<FileAttachmentProps> = ({
  title,
  onUpload,
  onDownload,
  downloadUrl,
  acceptedFileTypes = "*",
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      setFileName(file.name);
      onUpload(file);
    }
  };

  return (
    <div>
      <h3 className="text-grey-800 mb-2.5 inline-block font-medium">{title}</h3>

      <label className="flex h-[104px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary-500 bg-primary-50 text-sm text-gray-500">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedFileTypes}
        />
        <BiUpload className="mr-2 inline text-primary-500" size={20} />
        Upload Attachment
        {fileName && (
          <p className="mt-2 text-sm text-gray-600">Uploaded: {fileName}</p>
        )}
      </label>
    </div>
  );
};

export default FileInput;

// {downloadUrl && (
//     <a
//       href={downloadUrl}
//       download
//       className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
//       onClick={onDownload}
//     >
//       <BiDownload className="mr-2 inline" size={18} />
//       Download
//     </a>
//   )}
