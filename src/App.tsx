import { useState } from 'react';
import { Navbar } from './components/layouts/navbar/navbar'
import { Wrapper } from './components/container'
import { FileUpload, JsonViewer } from './components/features'
import { Button } from './components/ui';
import { Loader2 } from 'lucide-react';

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

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<object | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

 const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null); // Reset extracted data when new file is selected
  };

  const handleExtract = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    // Simulating API call
    setTimeout(() => {
      // sample data
      setExtractedData(SAMPLE_DATA);
      setIsProcessing(false);
      
    }, 5000);
  };

  console.log('extracted', extractedData)

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
                Json viewer here 
              </div>
            </div>
          </Wrapper>
        </section>
      </main>
    </>
  )
}

export default App
