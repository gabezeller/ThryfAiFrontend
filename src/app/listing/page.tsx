'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function Listing() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [responseData, setResponseData] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filePreviews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [filePreviews]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(
      (file) => 
        file.type === 'image/jpeg' || 
        file.type === 'image/png' ||
        file.name.endsWith('.jpg') ||
        file.name.endsWith('.png')
    );

    if (imageFiles.length > 0) {
      setFiles([imageFiles[0]]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const imageFiles = selectedFiles.filter(
        (file) => 
          file.type === 'image/jpeg' || 
          file.type === 'image/png' ||
          file.name.endsWith('.jpg') ||
          file.name.endsWith('.png')
      );
      if (imageFiles.length > 0) {
        setFiles([imageFiles[0]]);
      }
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus('Please select a file');
      return;
    }

    setUploading(true);
    setUploadStatus('');

    try {
      const formData = new FormData();
      
      // Append the single file to the FormData
      formData.append('file', files[0]);

      // You can also add additional fields if needed
      // formData.append('userId', 'some-user-id');
      // formData.append('description', 'some description');

      const response = await fetch('http://localhost:5207/api/Listing/autofill', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically with boundary
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      setUploadStatus('Upload successful!');
      setResponseData(result);
      console.log('Upload result:', result);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        <p className="text-gray-600 mb-4">Drag JPG or PNG files here or click to select</p>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={handleInputChange}
          className="hidden"
          id="fileInput"
          ref={inputRef}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Choose Files
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Selected File</h3>
          <ul className="space-y-2">
            {filePreviews.map((preview, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-700">
                <img
                  src={preview.url}
                  alt={preview.file.name}
                  className="h-12 w-12 rounded object-cover"
                />

              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
            <button
              onClick={() => {
                setFiles([]);
                setUploadStatus('');
                setResponseData(null);
              }}
              disabled={uploading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-2 rounded"
            >
              Clear
            </button>
          </div>

          {uploadStatus && (
            <p className={`mt-2 ${uploadStatus.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
              {uploadStatus}
            </p>
          )}
        </div>
      )}

      {responseData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Description:</h3>
          <p className="text-sm bg-white p-4 rounded border">
            {responseData.description || 'No description available'}
          </p>
        </div>
      )}
    </div>
  );
}
