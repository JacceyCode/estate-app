/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";

interface CloudinaryWidgetConfig {
  cloudName: string;
  uploadPreset: string;
  multiple: boolean;
  maxImageFileSize: number;
  folder: string;
}

interface UploadWidgetProps {
  uwConfig: CloudinaryWidgetConfig;
  setPublicId?: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

interface CloudinaryScriptContextType {
  loaded: boolean;
}

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<CloudinaryScriptContextType>(
  {} as CloudinaryScriptContextType
);

function UploadWidget({ uwConfig, setPublicId, setState }: UploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        (error: Error, result: any) => {
          if (!error && result && result.event === "success") {
            // console.log("Done! Here is the image info: ", result.info);
            setPublicId?.(result.info.secure_url);
            setState?.((prev: any) => [...prev, result.info.secure_url]);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
