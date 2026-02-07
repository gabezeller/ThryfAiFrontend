'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaWandMagicSparkles, FaImage } from 'react-icons/fa6';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Listing() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [responseData, setResponseData] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Editable fields
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  
  const [posting, setPosting] = useState(false);
  const [postStatus, setPostStatus] = useState<string>('');

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
      setUploadStatus('AI generation successful!');
      setResponseData(result);
      
      // Autofill the form fields
      setProductName(result.productName || result.name || '');
      setDescription(result.description || '');
      setPrice(result.price?.toString() || '');
      setGender(result.gender || '');
      
      console.log('Upload result:', result);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handlePostListing = async () => {
    if (!productName || !description || !price || !gender || !responseData?.imageUrl) {
      setPostStatus('Please fill in all required fields');
      return;
    }

    setPosting(true);
    setPostStatus('');

    try {
      const listingData = {
        productName,
        description,
        price: parseFloat(price),
        gender,
        imageUrl: responseData.imageUrl, // Use the AWS URL from the autofill response
      };

      const response = await fetch('http://localhost:5207/api/Listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Post failed: ${response.statusText}`);
      }

      const result = await response.json();
      setPostStatus('Listing posted successfully!');

      console.log('Post result:', result);
      
      // Redirect to the listing page
      window.location.href = `/listing/${result.id}`;
      
    } catch (error) {
      console.error('Post error:', error);
      setPostStatus(`Post failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans relative overflow-hidden">
      {/* Decorative Fashion Images - Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1 }}
          src="/fashion-orange.png"
          alt="decoration"
          className="absolute top-10 left-20 w-40 h-40 object-cover rounded-3xl rotate-12 blur-sm"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2 }}
          src="/fashion-blue.png"
          alt="decoration"
          className="absolute top-40 right-10 w-32 h-32 object-cover rounded-2xl -rotate-6 blur-sm"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.4 }}
          src="/fashion-green.png"
          alt="decoration"
          className="absolute bottom-20 left-10 w-36 h-36 object-cover rounded-3xl rotate-6 blur-sm"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.1 }}
          src="/fashion-yellow.png"
          alt="decoration"
          className="absolute top-1/4 left-1/4 w-28 h-28 object-cover rounded-2xl -rotate-12 blur-sm"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.3 }}
          src="/fashion-mint.png"
          alt="decoration"
          className="absolute bottom-1/4 right-1/4 w-32 h-32 object-cover rounded-3xl rotate-3 blur-sm"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/fashion-colorful.png"
          alt="decoration"
          className="absolute top-1/2 right-20 w-24 h-24 object-cover rounded-2xl -rotate-6 blur-sm"
        />
      </div>

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold leading-10 tracking-tight text-black mb-3">Create Listing</h2>
          <p className="text-lg font-semibold bg-gradient-to-r from-[#fc934d] to-[#ff6b35] bg-clip-text text-transparent">
            Powered by AI
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative shadow-[5px_5px_0px_rgba(0,0,0,1)] rounded-lg p-12 text-center transition-all duration-300 bg-zinc-50 ${
            dragActive
              ? 'shadow-[3px_3px_0px_rgba(0,0,0,1)] scale-[0.98]'
              : 'hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:opacity-90'
          }`}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-gray-400">
              <FaImage className="w-full h-full" />
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-tr from-amber-300 to-amber-400 text-black font-semibold rounded-lg shadow-md hover:opacity-75 transition-all duration-200"
            >
              <FaImage className="mr-2" />
              Browse Files
            </button>
            <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG</p>
          </div>
        </motion.div>

        {/* Preview & Actions */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-zinc-50 shadow-[5px_5px_0px_rgba(0,0,0,1)] rounded-lg p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Preview</h3>
            
            {/* Image Preview */}
            <div className="flex justify-center mb-6">
              {filePreviews.map((preview, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="relative inline-block">
                    <img
                      src={preview.url}
                      alt={preview.file.name}
                      className="w-80 h-80 rounded-lg object-cover shadow-[5px_5px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <div className="mt-4">
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleUpload}
                disabled={uploading || responseData}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-tr from-amber-300 to-amber-400 hover:opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-semibold rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                    <div className="mr-2" >
                    Continue
                  </div>
                )}
              </button>
              <button
                onClick={() => {
                  setFiles([]);
                  setUploadStatus('');
                  setResponseData(null);
                  setProductName('');
                  setDescription('');
                  setPrice('');
                  setGender('');
                  setPostStatus('');
                }}
                disabled={uploading}
                className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                Clear
              </button>
            </div>

            {/* Status Message */}
            
          </motion.div>
        )}

        {/* Editable Form Section */}
        {responseData && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-zinc-50 shadow-[5px_5px_0px_rgba(0,0,0,1)] rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Edit Listing Information</h3>
            </div>
            
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700"
                  placeholder="Enter price"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <Select value={gender} onValueChange={(e) => setGender(e)}>
                  <SelectTrigger className="w-full bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700 resize-none"
                  placeholder="Enter description"
                />
              </div>

              {/* Post Button */}
              <div className="flex gap-3 justify-center pt-4">
                <button
                  onClick={handlePostListing}
                  disabled={posting || !productName || !description || !price || !gender}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-tr from-amber-300 to-amber-400 hover:opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-semibold rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200"
                >
                  {posting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : 'Post Listing'}
                </button>
              </div>

              {/* Post Status Message */}
              {postStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg text-center font-medium ${
                    postStatus.includes('successfully') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {postStatus}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
