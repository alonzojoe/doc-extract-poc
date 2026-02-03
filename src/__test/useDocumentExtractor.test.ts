import { act, renderHook } from '@testing-library/react';
import { useDocumentExtractor } from '@/features/document-extractor/useDocumentExtractor';

const postMock = vi.fn();

vi.mock('@/services/api', () => ({
  default: {
    post: (...args: unknown[]) => postMock(...args),
  },
}));

const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock('react-hot-toast', () => ({
  default: {
    success: (...args: unknown[]) => toastSuccessMock(...args),
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
}));

describe('useDocumentExtractor', () => {
  beforeEach(() => {
    postMock.mockReset();
    toastSuccessMock.mockReset();
    toastErrorMock.mockReset();
  });

  it('starts with empty state', () => {
    const { result } = renderHook(() => useDocumentExtractor());

    expect(result.current.selectedFile).toBeNull();
    expect(result.current.extractedData).toBeNull();
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.canExtract).toBe(false);
  });

  it('selecting a file sets selectedFile and clears previous results', () => {
    const { result } = renderHook(() => useDocumentExtractor());

    const file = new File(['pdf'], 'a.pdf', { type: 'application/pdf' });

    act(() => {
      result.current.handleFileSelect(file);
    });

    expect(result.current.selectedFile).toBe(file);
    expect(result.current.extractedData).toBeNull();
    expect(result.current.canExtract).toBe(true);
  });

  it('resetResults clears extractedData only', async () => {
    postMock.mockResolvedValueOnce({ data: { success: true, data: { hello: 'world' } } });

    const { result } = renderHook(() => useDocumentExtractor());
    const file = new File(['pdf'], 'a.pdf', { type: 'application/pdf' });

    act(() => {
      result.current.handleFileSelect(file);
    });

    await act(async () => {
      await result.current.handleExtract();
    });

    expect(result.current.extractedData).toEqual({ hello: 'world' });

    act(() => {
      result.current.resetResults();
    });

    expect(result.current.selectedFile).toBe(file);
    expect(result.current.extractedData).toBeNull();
  });

  it('handleExtract success sets extractedData and toasts success', async () => {
    postMock.mockResolvedValueOnce({ data: { success: true, data: { a: 1 } } });

    const { result } = renderHook(() => useDocumentExtractor());
    const file = new File(['pdf'], 'a.pdf', { type: 'application/pdf' });

    act(() => {
      result.current.handleFileSelect(file);
    });

    await act(async () => {
      await result.current.handleExtract();
    });

    expect(postMock).toHaveBeenCalledTimes(1);
    expect(postMock.mock.calls[0]?.[0]).toBe('/documents/extract');
    expect(result.current.extractedData).toEqual({ a: 1 });
    expect(toastSuccessMock).toHaveBeenCalled();
  });

  it('handleExtract failure toasts error and clears extractedData', async () => {
    postMock.mockResolvedValueOnce({ data: { success: false } });

    const { result } = renderHook(() => useDocumentExtractor());
    const file = new File(['pdf'], 'a.pdf', { type: 'application/pdf' });

    act(() => {
      result.current.handleFileSelect(file);
    });

    await act(async () => {
      await result.current.handleExtract();
    });

    expect(toastErrorMock).toHaveBeenCalled();
    expect(result.current.extractedData).toBeNull();
  });
});
