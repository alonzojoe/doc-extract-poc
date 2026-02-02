import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type JsonViewerProps = {
  data: Record<string, unknown> | null;
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

  const jsonString = data ? JSON.stringify(data, null, 2) : '';

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Extracted Data</h2>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-gray-200">
        {data ? (
          <div className="relative group">
            {/* Header with language and copy button */}
            <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-xs">
              <span className="font-medium">JSON</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-700 rounded transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

       
            <div className="overflow-auto max-h-[calc(100vh-300px)]">
              <SyntaxHighlighter
                language="json"
                style={oneLight}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                {jsonString}
              </SyntaxHighlighter>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[400px] bg-white">
            <div className="text-center text-gray-400">
              <p className="text-sm font-medium mb-1">No data yet</p>
              <p className="text-xs">Upload a document to see extracted data</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};