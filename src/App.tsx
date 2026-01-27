import { Navbar } from './components/layouts/navbar/navbar'
import { Wrapper } from './components/container'
import { FileUpload } from './components/features'

function App() {

  const handleFileSelect = () => {
    console.log('file')
  }

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
