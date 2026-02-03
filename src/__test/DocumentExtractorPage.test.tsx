import { render, screen } from '@testing-library/react';
import { DocumentExtractorPage } from '@/pages/DocumentExtractorPage';

describe('DocumentExtractorPage', () => {
  it('renders the page title', () => {
    render(<DocumentExtractorPage />);
    expect(screen.getByRole('heading', { name: /document extractor/i })).toBeInTheDocument();
  });
});
