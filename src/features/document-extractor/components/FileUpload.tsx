import { useCallback, useRef, useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileUploadProps = {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  accept?: string;
};

export const FileUpload = ({
  selectedFile,
  onFileSelect,
  onClear,
  accept = '.pdf',
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) onFileSelect(files[0]);
    },
    [onFileSelect],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) onFileSelect(files[0]);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-2xl p-10 transition-all',
          'flex flex-col items-center justify-center gap-4',
          'border border-dashed',
          isDragging
            ? 'border-blue-500 bg-blue-50/70 ring-4 ring-blue-100'
            : 'border-gray-200 bg-white/70 hover:bg-white hover:ring-4 hover:ring-gray-100',
        )}
      >
        <button
          type="button"
          onClick={triggerFileInput}
          className={cn(
            'grid place-items-center size-14 rounded-2xl transition-colors animate-bounce',
            isDragging ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700',
            'hover:bg-blue-100 hover:text-blue-700',
          )}
          aria-label="Select a file"
        >
          <Upload className="size-6" />
        </button>

        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">
            Drop your document here, or{' '}
            <span className="text-blue-700 underline underline-offset-4">browse</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">Supports PDF files.</p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept={accept}
          />
        </div>
      </div>

      {selectedFile && (
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid place-items-center size-10 rounded-xl bg-blue-50 text-blue-700">
                <FileText className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              <X className="size-4" />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
