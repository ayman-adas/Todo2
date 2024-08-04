import React, { useState } from "react";
import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";

export default function AddImageCompnent() {
  const config2: ImagePickerConf = {
  borderRadius: "8px",
  language: "en",
  width: "330px",
  height: "250px",
  objectFit: "contain",
  compressInitial: null,
};
// const initialImage: string = '/assets/images/8ptAya.webp';
const initialImage = "";

  var [ImageSrc, setImageSrc] = useState("");
  <>
    <ReactImagePickerEditor
      config={config2}
      imageSrcProp={initialImage}
      imageChanged={(newDataUri: any) => {
        setImageSrc(newDataUri);
      }}
    />
  </>;
}
