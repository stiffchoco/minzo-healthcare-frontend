import { useState, useRef } from "react";
import useHttpServices  from "@/hooks/useHttpServices";

const getFileName = (path:any) => {
  return path.replace(/^.*[\\\/]/, "");
};

const useFileInputs = (len:number, presets = null) => {
  const CLOUD_NAME = "greyhairedgallery";
  const CLOUD_PRESETS =
    presets ?? "minzo-23e36e33ge6";

  const [isLoadState, setIsLoadState] = useState(false);

  // Each position represents a specific input.
  // Example:
  // fileData[0] = file from img-0
  // fileData[1] = file from img-1
  // ...
  const [fileData, setFileData] = useState(
    Array.from({ length: len }, () => null)
  );

  const [loadingPics, setLoadingPics] = useState({});

  const { postDataWithoutBaseUrl } = useHttpServices();

  const imageDiv = useRef<HTMLDivElement | null>(null);

  const clearFileDataSlot = (index:any) => {
    // console.log({index, fileData})
      const newItems = [...fileData];
      newItems.splice(index, 1);
      setFileData([...newItems]);
  };

  const openPic = (picId:any) => {
    const div = imageDiv.current;
    if (!div) return;

    const imageInp = div.querySelector(picId);

    console.log({
      imageInp,
      picId,
    });

    imageInp?.click();
  };

  const uploadImages = async () => {
    console.log({fileData})
    const imagesURLs = [];
  
    for (let i = 0; i < fileData.length; i++) {
      const currentFile = fileData[i] ?? {} as any;

      // Skip slots where no file was selected
      if (currentFile === null || !currentFile?.file) {
        continue;
      }

      const formData = new FormData();

      formData.append("file", currentFile?.file);
      formData.append("upload_preset", CLOUD_PRESETS);
      formData.append("folder", "uploads/files");

      try {
        const { data, error }:{data:any, error?:any} = await postDataWithoutBaseUrl({
          path: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
          body: formData,
        });

        if (error || !data?.secure_url) {
          console.log({
            error,
            index: i,
          });

          return {
            error: "Cloudinary upload failed",
          };
        }

        imagesURLs.push({
          url: data.secure_url,
          index: i,
          delete_token: data.delete_token,
          resource_type: data.resource_type,
          public_id: data.public_id,
          fileName:
            currentFile.fileName || currentFile.file.name,
        });
      } catch (error:any) {
        console.log({
          error,
          index: i,
        });

        return {
          error: error.message || "Cloudinary not working",
        };
      }
    }

    return {
      imagesURLs,
    };
  };

  return {
    openPic,

    isLoadState,
    setIsLoadState,

    loadingPics,

    uploadImages,

    setFileData,
    fileData,

    imageDiv,
    clearFileDataSlot
  };
};

export default useFileInputs;