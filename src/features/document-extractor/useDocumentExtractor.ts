import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';

type ExtractedData = Record<string, unknown> | null;

type UseDocumentExtractorReturn = {
  selectedFile: File | null;
  extractedData: ExtractedData;
  isProcessing: boolean;
  canExtract: boolean;
  handleFileSelect: (file: File) => void;
  clearSelectedFile: () => void;
  handleExtract: () => Promise<void>;
  resetResults: () => void;
  resetAll: () => void;
};

export const useDocumentExtractor = (): UseDocumentExtractorReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const canExtract = useMemo(() => !!selectedFile && !isProcessing, [selectedFile, isProcessing]);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    // selecting a new file should invalidate any previous results
    setExtractedData(null);
  }, []);

  const clearSelectedFile = useCallback(() => {
    setSelectedFile(null);
    setExtractedData(null);
  }, []);

  const resetResults = useCallback(() => {
    setExtractedData(null);
  }, []);

  const resetAll = useCallback(() => {
    setSelectedFile(null);
    setExtractedData(null);
    setIsProcessing(false);
  }, []);

  const handleExtract = useCallback(async () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('document', selectedFile);

      const res = await api.post('/documents/extract', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success) {
        setExtractedData(res.data.data);
        toast.success('Data extracted successfully', { duration: 3500 });
        return;
      }

      toast.error('Extraction failed. Please try again.', { duration: 5000 });
      setExtractedData(null);
    } catch (err) {
      toast.error('An error occurred while extracting data.', { duration: 5000 });
      setExtractedData(null);
      // eslint-disable-next-line no-console
      console.error('Error extracting document:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, isProcessing]);

  return {
    selectedFile,
    extractedData,
    isProcessing,
    canExtract,
    handleFileSelect,
    clearSelectedFile,
    handleExtract,
    resetResults,
    resetAll,
  };
};
