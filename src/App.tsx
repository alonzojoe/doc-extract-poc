import { Navbar } from './components/layouts/navbar/navbar'
import { Wrapper } from './components/container'
import { FileUpload, JsonViewer } from './components/features'
import { Button } from './components/ui';
import { Loader2 } from 'lucide-react';
import { useDocumentExtractor } from './hooks';


function App() {
  const {
    selectedFile, 
    extractedData,
    isProcessing,
    handleFileSelect,
    handleExtract,
  } = useDocumentExtractor()

  return (
    <>
      <Navbar />
      <main className="text-base text-sub antialiased h-dvh bg-white">
        <section id="home" className="pt-28 lg:pt-20">
        <Wrapper className="px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Document Extractor
                  </h1>
                  <p className="text-sm text-gray-600">
                    Upload a document to extract structured data
                  </p>
                </div>

                <FileUpload onFileSelect={handleFileSelect} />

             
                  <Button
                    onClick={handleExtract}
                    disabled={isProcessing || !selectedFile}
                    className="w-full cursor-pointer"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Extract Data'
                    )}
                  </Button>
             

              
              </div>

              <div className="lg:sticky lg:top-24 h-fit">
                <JsonViewer data={extractedData}/>
              </div>
            </div>
          </Wrapper>
        </section>
      </main>
    </>
  )
}

export default App
