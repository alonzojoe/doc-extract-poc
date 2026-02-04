import { Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui';
import { Wrapper } from '@/components/layout';
import { FileUpload, JsonViewer } from '@/features/document-extractor/components';
import { useDocumentExtractor } from '@/features/document-extractor/useDocumentExtractor';

export const DocumentExtractorPage = () => {
  const {
    selectedFile,
    extractedData,
    isProcessing,
    canExtract,
    handleFileSelect,
    clearSelectedFile,
    handleExtract,
    resetResults,
    resetAll,
  } = useDocumentExtractor();

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 via-white to-slate-50 text-gray-900">
      <section id="home" className="pt-10 pb-14">
        <Wrapper className="px-4">
          <div className="mb-8">
        
            <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Document Extractor
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Upload a PDF, extract structured data, and copy the JSON output.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-sm font-bold">Upload</h2>
                    <p className="text-xs text-gray-500">Choose a PDF to extract</p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={resetAll}
                    disabled={!selectedFile && !extractedData && !isProcessing}
                    title="Reset everything"
                  >
                    <RotateCcw className="size-4" />
                    Reset all
                  </Button>
                </div>

                <FileUpload
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  onClear={clearSelectedFile}
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                />

                <div className="mt-5 flex flex-col gap-2">
                  <Button
                    onClick={handleExtract}
                    disabled={!canExtract}
                    className="w-full cursor-pointer rounded-2xl"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="size-5 mr-2 animate-spin" />
                        Extracting...
                      </>
                    ) : (
                      'Extract data'
                    )}
                  </Button>

                  <p className="text-xs text-gray-500">
                    Tip: select a new file to automatically clear previous results.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white/70 p-5">
                <h3 className="text-sm font-bold">Notes</h3>
                <ul className="mt-2 text-xs text-gray-600 space-y-1 list-disc pl-5">
                  <li>Supports PDF and image files (JPG, PNG, WEBP).</li>
                  <li>Click "Reset" in Results to clear output without losing the file.</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3 lg:sticky lg:top-6 h-fit">
              <JsonViewer data={extractedData} isProcessing={isProcessing} onReset={resetResults} />
            </div>
          </div>
        </Wrapper>
      </section>
    </main>
  );
};
