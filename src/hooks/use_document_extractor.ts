import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useDocumentExtractor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<Record<string, unknown> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null);
    setError(null);
  };

  const handleExtract = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {

      const formData = new FormData();
      formData.append('document', selectedFile)

      console.log('Uploading file:', selectedFile.name);

      const res = await api.post('/documents/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.success) {
        toast.success("Data extracted successfully", {
          duration: 5000
        })
        setExtractedData(res.data.data);
      } else {
        console.log('error', error)
        toast.error("An error occured while extracting data.", {
          duration: 5000
        })
        throw new Error('Extraction failed');
      }
    } catch (error) {
      toast.error("An error occured while extracting data.", {
        duration: 5000
      })
      console.error('Error extracting document:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetExtractor = () => {
    setSelectedFile(null);
    setExtractedData(null);
    setIsProcessing(false);
  };

  return {
    selectedFile,
    extractedData,
    isProcessing,
    handleFileSelect,
    handleExtract,
    resetExtractor,
  };
};