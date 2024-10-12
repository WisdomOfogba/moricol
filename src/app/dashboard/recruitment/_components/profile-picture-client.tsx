"use client";

import React, { useRef, useState } from "react";
import ContentLayout from "./content-layout";
import { BiUpload, BiX } from "react-icons/bi";

function ProfilePictureClient({ next_route }: { next_route: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      setFile(file);
    } else {
      alert("File size exceeds 5MB limit");
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
  };
  return (
    <ContentLayout next_route={next_route} pageTitle="Profile Picture" step={8}>
      <div
        className={`rounded-lg border-2 border-dashed p-8 text-center ${dragActive ? "border-yellow-500" : "border-gray-300"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <BiUpload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="mb-2 text-lg">Drag & drop file here</p>
            <p className="mb-4 text-sm text-gray-500">File format: Png/Jpeg</p>
            <button
              onClick={onButtonClick}
              className="rounded-md bg-yellow-100 px-4 py-2 text-yellow-800 transition duration-300 hover:bg-yellow-200"
            >
              Upload now
            </button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/png, image/jpeg"
            />
          </>
        ) : (
          <div className="flex items-center justify-between rounded-md bg-yellow-50 p-4">
            <span>{file.name}</span>
            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <BiX size={20} />
            </button>
          </div>
        )}
      </div>
      {!file && (
        <p className="mt-2 text-sm text-gray-500">Maximum file size 5MB</p>
      )}
      {file && (
        <p className="mt-2 text-sm text-yellow-600">
          File uploaded successfully.{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={removeFile}
          >
            Change file
          </button>
        </p>
      )}
    </ContentLayout>
  );
}

export default ProfilePictureClient;