import { useState } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import { config } from "@/config";
import { FolderSelectModal } from "../Modal/FolderSelectModal";
import { getFileStructure } from "@/services/api";
import { useAppContext } from "@/contexts/AppContext";

interface ExplorerProps {
  className?: string;
}

interface FileSystemItem {
  name: string;
  type: "file" | "directory";
  path: string;
}

export const Explorer = ({ className = "" }: ExplorerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [pathHistory, setPathHistory] = useState<string[]>([]);

  const {
    folderPath,
    saveScreenshots,
    setFolderPath,
    setSaveScreenshots,
    isExplorerCollapsed,
    setIsExplorerCollapsed,
  } = useAppContext();

  if (!config.explorer.enabled) {
    return null;
  }

  const loadDirectory = async (path: string, isBack = false) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getFileStructure(path);
      setItems(data);
      setFolderPath(path);

      if (!isBack) {
        setPathHistory((prev) => [...prev, path]);
      }
    } catch (err) {
      setError("Failed to load directory");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectSelect = (path: string) => {
    setPathHistory([]);
    loadDirectory(path);
  };

  const handleBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = [...pathHistory];
      newHistory.pop(); // Remove current path
      const previousPath = newHistory[newHistory.length - 1];
      setPathHistory(newHistory);
      loadDirectory(previousPath, true).then();
    }
  };

  const renderItems = () => {
    return items.map((item) => (
      <div
        key={item.path}
        className="flex items-center py-1 px-2 hover:bg-content2 rounded cursor-pointer group transition-colors min-w-0"
        onClick={() => {
          if (item.type === "directory") {
            loadDirectory(item.path);
          }
        }}
      >
        {item.type === "directory" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-warning mr-2 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H2V6zm0 3v6a2 2 0 002 2h12a2 2 0 002-2V9H2z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-foreground/60 mr-2 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="text-foreground/90 group-hover:text-foreground transition-colors truncate min-w-0">
          {item.name}
        </span>
      </div>
    ));
  };

  return (
    <div
      className={`bg-background border-l border-content3 overflow-hidden flex flex-col flex-shrink-0 transition-[width] duration-300 ease-in-out h-full ${
        isExplorerCollapsed ? "w-12" : "min-w-[350px] w-[350px]"
      } ${className}`}
    >
      <div className="flex items-center h-12 border-b border-content3 flex-shrink-0 pr-4">
        <button
          onClick={() => setIsExplorerCollapsed(!isExplorerCollapsed)}
          className="text-foreground/60 hover:text-foreground transition-colors px-4 flex-shrink-0"
        >
          {isExplorerCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <h2
          className={`text-foreground font-medium flex-1 truncate text-left ${
            isExplorerCollapsed ? "hidden" : "block"
          }`}
        >
          Explorer
        </h2>
        {!isExplorerCollapsed && (
          <Button
            isIconOnly={false}
            variant="flat"
            color="default"
            size="sm"
            onPress={() => setIsModalOpen(true)}
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H2V6zm0 3v6a2 2 0 002 2h12a2 2 0 002-2V9H2z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Open
          </Button>
        )}
      </div>
      <div
        className={`flex-1 overflow-y-auto ${
          isExplorerCollapsed ? "hidden" : "block"
        }`}
      >
        {folderPath && !isExplorerCollapsed && (
          <div className="bg-background">
            <div className="flex items-center px-4 py-3 border-b border-content3">
              <button
                onClick={handleBack}
                disabled={pathHistory.length <= 1}
                className={`mr-2 p-1 rounded hover:bg-content3 flex-shrink-0 transition-colors ${
                  pathHistory.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-foreground/60"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="text-foreground/60 text-sm truncate text-left flex-1">
                {folderPath}
              </div>
            </div>

            <div className="px-5 py-3 border-b border-content3 text-left">
              <Checkbox
                isSelected={saveScreenshots}
                onValueChange={(isSelected) => setSaveScreenshots(isSelected)}
                color="primary"
                size="sm"
                classNames={{
                  label: "text-foreground/90"
                }}
              >
                Save screenshots
              </Checkbox>
            </div>
          </div>
        )}

        <div className="p-6 bg-background">
          {error && (
            <div className="text-danger mb-4 p-2 bg-danger/20 rounded">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : folderPath ? (
            <div className="space-y-1">{renderItems()}</div>
          ) : (
            <div className="text-center py-8">
              <p className="text-foreground/90">No project opened</p>
              <p className="text-sm text-foreground/60 mt-2">
                Click "Open Project" to select a folder
              </p>
            </div>
          )}
        </div>
      </div>

      <FolderSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(path) => {
          handleProjectSelect(path);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
