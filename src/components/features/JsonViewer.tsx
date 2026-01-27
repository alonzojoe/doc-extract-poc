import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface JsonViewerProps {
  data: object | null;
}

export const JsonViewer = ({ data }: JsonViewerProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (data) {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Extracted Data</h2>
        {data && (
          <button
            onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              copied
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy JSON
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex-1 border border-gray-200 rounded-lg bg-white overflow-hidden">
        {data ? (
          <pre className="p-6 overflow-auto h-full text-sm font-mono">
            <code className="text-gray-800">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center py-5">
              <p className="text-sm font-medium mb-1">Upload a document to see extracted data</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};