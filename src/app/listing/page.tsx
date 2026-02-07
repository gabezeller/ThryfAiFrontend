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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create Listing</h1>
          <p className="text-gray-600 text-lg">Upload your item image to generate an AI description</p>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 bg-white shadow-sm ${
            dragActive
              ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
              : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
          }`}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-1">
                {dragActive ? 'Drop your image here' : 'Drag & drop your image'}
              </p>
              <p className="text-sm text-gray-500">or click the button below</p>
            </div>
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
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG</p>
          </div>
        </div>

        {/* Preview & Actions */}
        {files.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Preview</h3>
            
            {/* Image Preview */}
            <div className="flex justify-center mb-6">
              {filePreviews.map((preview, idx) => (
                <div key={idx} className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={preview.url}
                      alt={preview.file.name}
                      className="w-80 h-80 rounded-xl object-cover shadow-xl ring-1 ring-gray-200"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">{preview.file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{(preview.file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Generate Description'}
              </button>
              <button
                onClick={() => {
                  setFiles([]);
                  setUploadStatus('');
                  setResponseData(null);
                }}
                disabled={uploading}
                className="px-8 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                Clear
              </button>
            </div>

            {/* Status Message */}
            {uploadStatus && (
              <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
                uploadStatus.includes('successful') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {uploadStatus}
              </div>
            )}
          </div>
        )}

        {/* Response Section */}
        {responseData && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Generated Description</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <p className="text-gray-700 text-base leading-relaxed">
                {responseData.description || 'No description available'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
