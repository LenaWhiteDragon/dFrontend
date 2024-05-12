import React, { useEffect, useState } from "react";
type Props = {
    onImageChange: (file: File | null) => void
}   
export const UploadAndDisplayImage = (props: Props) => {

  const [selectedImage, setSelectedImage] = useState<null | File>(null);

  useEffect(() => {
    props.onImageChange(selectedImage)
  }, [selectedImage])

  return (
    <div>
      <label>Добавить изображение: <span  className={"red-text"}>*</span></label>
      {/* <h1>Upload and Display Image usign React Hook's</h1> */}
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />
      <br />
      
      <input
        type="file"
        name="myImage" 
        accept=".png, .jpg, .jpeg"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event?.target?.files?.[0]??null
          console.log(file);
          setSelectedImage(file);
        }}
      />
    </div>
  );
};

