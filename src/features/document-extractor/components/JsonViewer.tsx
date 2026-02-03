import { useMemo, useState } from 'react';
import { Check, Copy, RotateCcw, Trash } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui';

type JsonViewerProps = {
  data: Record<string, unknown> | null;
  isProcessing?: boolean;
  onReset?: () => void;
};

export const JsonViewer = ({ data, isProcessing, onReset }: JsonViewerProps) => {
  const [copied, setCopied] = useState(false);

  const jsonString = useMemo(() => (data ? JSON.stringify(data, null, 2) : ''), [data]);

  const handleCopy = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Results</h2>
          <p className="text-xs text-gray-500">Extracted JSON output</p>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={!data}
              className="rounded-xl"
              title="Reset results"
            >
              <Trash className="size-4" />
              Clear
            </Button>
          )}

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            disabled={!data}
            className="rounded-xl"
          >
            {copied ? (
              <>
                <Check className="size-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="min-h-[420px]">
        {isProcessing ? (
          <div className="p-5">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-3 w-72 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-80 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-3 w-72 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-80 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-3 w-72 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-80 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-3 w-72 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-80 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-3 w-72 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-80 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-3 w-72 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-80 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse mb-2" />
          </div>
        ) : data ? (
          <div className="overflow-auto max-h-[calc(100vh-270px)]">
            <SyntaxHighlighter
              language="json"
              style={oneLight}
              PreTag="div"
              customStyle={{
                margin: 0,
                background: 'transparent',
                fontSize: '0.875rem',
                padding: '1.25rem',
              }}
            >
              {jsonString}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="grid place-items-center min-h-[420px] p-6">
            <div className="text-center">
              <div className="mx-auto mb-3 size-12 rounded-2xl bg-gray-100 grid place-items-center text-gray-700">
                <Copy className="size-5" />
              </div>
              <p className="text-sm font-semibold text-gray-900">No results yet</p>
              <p className="mt-1 text-xs text-gray-500">Upload a PDF and click Extract.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
