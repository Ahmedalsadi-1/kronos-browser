import { PreviewProps } from './PreviewTypes';
import { PreviewHeader } from './PreviewHeader';
import { PreviewUrlBar } from './PreviewUrlBar';
import { PreviewContent } from './PreviewContent';
import { usePreview } from './usePreview';

export const Preview = ({ className = '' }: PreviewProps) => {
  const {
    screenshot,
    error,
    status,
    streamingSource,
    interactiveMode,
    urlHistory,
    urlInput,
    previewRef,
    imageRef,
    handleSourceChange,
    handleInteractiveModeChange,
    handleUrlSubmit,
    handleBackNavigation,
    handleInteraction,
    setUrlInput
  } = usePreview();

  return (
    <div className={`bg-background h-full flex flex-col border-b border-content3 ${className}`}>
          <PreviewHeader
            streamingSource={streamingSource}
            interactiveMode={interactiveMode}
            status={status}
            onSourceChange={handleSourceChange}
            onInteractiveModeChange={handleInteractiveModeChange}
          />
          {streamingSource === 'chrome-puppeteer' && (
            <PreviewUrlBar
              urlInput={urlInput}
              urlHistory={urlHistory}
              onUrlSubmit={handleUrlSubmit}
              onUrlInputChange={setUrlInput}
              onBackNavigation={handleBackNavigation}
            />
          )}
      <PreviewContent
        error={error}
        screenshot={screenshot}
        streamingSource={streamingSource}
        interactiveMode={interactiveMode}
        handleInteraction={handleInteraction}
        previewRef={previewRef}
        imageRef={imageRef}
      />
    </div>
  );
};
