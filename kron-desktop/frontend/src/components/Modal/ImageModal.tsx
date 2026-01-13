import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { useState } from 'react';

interface OmniParserResult {
  parsed_content: string[];
  label_coordinates: {
    [key: string]: [number, number, number, number];
  };
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  omniParserResult?: OmniParserResult;
}

export const ImageModal = ({ isOpen, onClose, imageUrl, omniParserResult }: ImageModalProps) => {
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="4xl"
      classNames={{
        backdrop: "bg-black/70 backdrop-blur-sm",
        base: "border-none bg-background dark:bg-background text-foreground",
        body: "!p-0",
        wrapper: "items-center justify-center",
      }}
    >
      <ModalContent>
        <ModalBody className="!p-0">
          <div className="flex flex-col">
            <div className={`${omniParserResult && omniParserResult.parsed_content && omniParserResult.parsed_content.length > 0 ? 'h-[calc(80vh-160px)]' : 'h-[80vh]'} bg-black flex items-center relative`}>
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              {(hoveredElement!==null) && omniParserResult?.label_coordinates[hoveredElement] && (
                <>
                  <div 
                    className="absolute pointer-events-none transition-transform transition-opacity duration-300 ease-out opacity-100 translate-x-[-120%] translate-y-[-50%]"
                    style={{
                      left: `${omniParserResult.label_coordinates[hoveredElement][0] * 100}%`,
                      top: `${omniParserResult.label_coordinates[hoveredElement][1] * 100}%`,
                    }}
                  >
                    <div className="bg-danger rounded-full p-3 shadow-lg ring-2 ring-white">
                      <svg 
                        className="w-6 h-6 text-white"
                        viewBox="0 0 24 24" 
                      >
                        <path 
                          fill="currentColor"
                          d="M16.15 12.83l-5.3 5.3a.75.75 0 01-1.06-1.06l3.97-3.97H6.75a.75.75 0 010-1.5h7.01l-3.97-3.97a.75.75 0 011.06-1.06l5.3 5.3a.75.75 0 010 1.06z"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
            {omniParserResult && omniParserResult.parsed_content && omniParserResult.parsed_content.length > 0 && (
              <div className="h-[160px] border-t border-divider bg-background dark:bg-background">
                <div className="h-10 flex items-center justify-between px-4 border-b border-content2">
                  <h3 className="text-sm font-medium text-foreground">Detected Elements
                  <span className="text-xs text-foreground/70">({omniParserResult.parsed_content.length} elements)</span>
                  </h3>
                </div>
                <div className="h-[120px] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2 p-2">
                    {omniParserResult.parsed_content.map((element, idx) => (
                      <div 
                        key={idx} 
                        className="group px-3 py-2 rounded-md bg-content1 dark:bg-content1 text-sm text-foreground hover:bg-content3 dark:hover:bg-content3 transition-all cursor-pointer flex items-center gap-3"
                        onMouseEnter={() => setHoveredElement(idx)}
                        onMouseLeave={() => setHoveredElement(null)}
                      >
                        <div className={`p-1.5 rounded-full transition-all ${hoveredElement === idx ? 'bg-danger/10' : 'group-hover:bg-danger/5'}`}>
                          <svg 
                            className={`w-5 h-5 text-foreground/80 group-hover:text-danger transition-all ${hoveredElement === idx ? 'text-danger scale-110' : ''}`}
                            viewBox="0 0 24 24"
                          >
                            <path 
                              fill="currentColor"
                              d="M16.15 12.83l-5.3 5.3a.75.75 0 01-1.06-1.06l3.97-3.97H6.75a.75.75 0 010-1.5h7.01l-3.97-3.97a.75.75 0 011.06-1.06l5.3 5.3a.75.75 0 010 1.06z"
                            />
                          </svg>
                        </div>
                        <span className="truncate">{element}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
