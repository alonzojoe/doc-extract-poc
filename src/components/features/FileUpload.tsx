import { useCallback, useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '../../lib/utils';

type FileUploadProps = {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      onFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-12 transition-all",
          "flex flex-col items-center justify-center gap-4",
          "hover:border-gray-400 hover:bg-gray-50/50",
          isDragging ? "border-blue-500 bg-blue-50/50" : "border-gray-300 bg-white"
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            onClick={triggerFileInput}
            className={cn(
              "p-4 rounded-full transition-colors cursor-pointer",
              isDragging ? "bg-blue-100" : "bg-gray-100",
              "hover:bg-blue-100"
            )}
          >
            <Upload className={cn(
              "w-8 h-8 transition-colors",
              isDragging ? "text-blue-600" : "text-gray-500"
            )} />
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Drop your document here, or{' '}
              <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                browse
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".pdf"
                />
              </label>
            </p>
            <p className="text-xs text-gray-500">
              Supports PDF files.
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 bg-blue-50 rounded">
                <File className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Remove file"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};