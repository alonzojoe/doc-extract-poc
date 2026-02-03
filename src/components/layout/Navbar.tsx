import { FileSearch } from 'lucide-react';
import { Wrapper } from './Wrapper';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-white/60 backdrop-blur-xl">
      <Wrapper className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid place-items-center size-9 rounded-xl bg-gray-900 text-white shadow-sm">
            <FileSearch className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-gray-900">Doc Extract</p>
            <p className="text-[11px] text-gray-500">POC</p>
          </div>
        </div>

        <a
          href="#home"
          className="text-xs font-semibold text-gray-600 hover:text-gray-900"
        >
          Document Extractor
        </a>
      </Wrapper>
    </nav>
  );
};
