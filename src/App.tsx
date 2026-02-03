import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout';
import { DocumentExtractorPage } from './pages/DocumentExtractorPage';

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <DocumentExtractorPage />
    </>
  );
}

export default App;
