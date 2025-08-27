import React, { useState } from 'react'

import axios from 'axios'
// import { getBaseUrl } from '../../../../utils/baseURL';
import getBaseUrl from '../../../../utils/baseURL';


const UploadImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    // base64 functionality

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    // request to upload a file
    const uploadSingleImage = (base64) => {
        setLoading(true);
        axios
            .post(`${getBaseUrl()}/uploadImage`, { image: base64 })
            .then((res) => {
                const imageUrl = res.data;
                setUrl(imageUrl);
                // console.log(imageUrl);
                alert("Image uploaded successfully");
                setImage(imageUrl);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error uploading image", error);
                setLoading(false);
            });
    };

    const uploadImage = async (event) => {
        const files = event.target.files;

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }

        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            const base = await convertBase64(files[i]);
            base64s.push(base);
        }
    }


    //     return (
    //         <div>
    //             <label htmlFor={name}>Upload Image</label>
    //             <input type="file"
    //                 name={name}
    //                 id={name}
    //                 onChange={uploadImage}
    //                 className='add-product-InputCSS' />
    //             {
    //                 loading && (
    //                     <div className='mt-2 text-sm text-blue-600'>Product uploading...</div>
    //                 )
    //             }
    //             {
    //                 url && (
    //                     <div className='mt-2 text-sm text-green-600'>
    //                         <p>Image uploaded successfully!</p>
    //                         <img src={url} alt="uploaded-image" />
    //                     </div>
    //                 )
    //             }
    //         </div>
    //     )
    // }

    return (
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      Upload Image
    </label>

    <input
      type="file"
      name={name}
      id={name}
      onChange={uploadImage}
      className="add-product-InputCSS
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border file:border-gray-300
        file:bg-white file:text-sm file:font-medium
        file:text-gray-700
        hover:file:bg-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition-all duration-150
        cursor-pointer"
    />

    {loading && (
      <p className="mt-2 text-sm text-blue-600 animate-pulse">
        Uploading image...
      </p>
    )}

    {url && (
      <div className="mt-4">
        <p className="text-sm text-green-600 font-medium mb-2">
          Image uploaded successfully:
        </p>
        <img
          src={url}
          alt="Uploaded preview"
          className="w-32 h-32 object-cover rounded border border-gray-200 shadow"
        />
      </div>
    )}
  </div>
);

}

    export default UploadImage