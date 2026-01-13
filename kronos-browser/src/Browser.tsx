import React, { useState, useRef } from 'react';

export const Browser = () => {
    const [url, setUrl] = useState('https://www.google.com');
    const webviewRef = useRef(null);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleGo = () => {
        if (webviewRef.current) {
            webviewRef.current.loadURL(url);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex p-2 bg-gray-200">
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    className="flex-1 p-1 border rounded"
                />
                <button onClick={handleGo} className="p-1 ml-2 bg-blue-500 text-white rounded">
                    Go
                </button>
            </div>
            <webview ref={webviewRef} src={url} className="flex-1" />
        </div>
    );
};
