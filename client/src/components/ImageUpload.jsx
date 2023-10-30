import React, { useState } from "react";
import axios from "axios";

function ImageUpload({ value, setValue }) {
  const [preview, setPreview] = useState(null);

  const imageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      .then((response) => {
        setValue({ ...value, imageUrl: response.data.secure_url });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sm:px-8 md:px-16 sm:py-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={imageUpload}
            accept="image/*"
          />
          <label htmlFor="hidden-input" className="cursor-pointer">
            <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </div>
          </label>

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {value.imageUrl && (
              <img
                loading={"lazy"}
                src={value.imageUrl || preview}
                alt="preview"
                className="w-full"
              />
            )}
          </div>
        </header>
      </div>
    </div>
  );
}
export default ImageUpload;
