import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JsonViewer } from '@/features/document-extractor/components/JsonViewer';

describe('JsonViewer', () => {
  it('shows empty state when there is no data', () => {
    render(<JsonViewer data={null} />);

    expect(screen.getByText(/no results yet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeDisabled();
  });

  it('shows loading skeleton when isProcessing=true', () => {
    render(<JsonViewer data={null} isProcessing />);

    // title should always be present
    expect(screen.getByText(/results/i)).toBeInTheDocument();
    // empty-state copy button still exists but is disabled
    expect(screen.getByRole('button', { name: /copy/i })).toBeDisabled();
  });

  it('renders JSON when data is provided', () => {
    render(<JsonViewer data={{ a: 1, b: 'two' }} />);

    const code = document.querySelector('code.language-json');
    expect(code).toBeTruthy();
    expect(code?.textContent).toContain('"a"');
    expect(code?.textContent).toContain('1');
    expect(code?.textContent).toContain('"b"');
    expect(code?.textContent).toContain('two');

    expect(screen.getByRole('button', { name: /copy/i })).toBeEnabled();
  });

  it('calls onReset when Reset is clicked', async () => {
    const onReset = vi.fn();
    const user = userEvent.setup();

    render(<JsonViewer data={{ ok: true }} onReset={onReset} />);

    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('copies JSON to clipboard and shows Copied label', async () => {
    const user = userEvent.setup();

    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<JsonViewer data={{ a: 1 }} />);

    await user.click(screen.getByRole('button', { name: /copy/i }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(JSON.stringify({ a: 1 }, null, 2));

    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
  });
});
