import { useState } from 'react';
import api from '../services/api';

const SAMPLE_DATA = {
  documentType: "Invoice",
  extractedFields: {
    invoiceNumber: "INV-2026-001",
    date: "2026-01-27",
    total: "$1,234.56",
    vendor: "Agwanet",
    items: [
      { description: "Product A", quantity: 2, price: "$123.40" },
      { description: "Product B", quantity: 1, price: "$234.56" }
    ]
  },
}

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
        setExtractedData(res.data.data);
      } else {
        throw new Error('Extraction failed');
      }
    } catch (error) {
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