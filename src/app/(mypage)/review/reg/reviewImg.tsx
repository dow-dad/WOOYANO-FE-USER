'use client'
import Image from "next/image";
import React, { FC, Fragment, useRef, useState } from "react";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
import { ReviewType } from "@/types/ReviewType";

export interface PageAddListing7Props {
  reviewData: ReviewType;
  setReviewData: React.Dispatch<React.SetStateAction<ReviewType>>;
}

const ReviewImg: FC<PageAddListing7Props> = ({reviewData,setReviewData}) => {
  AWS.config.update({
    region: process.env.AWS_REGION as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);



  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = (event.target as HTMLInputElement).files;

    // if ( uploadedFiles && uploadedFiles[0].size > 10000) {
    //   // Display an error message or prevent further file uploads
    //   Swal.fire({
    //     toast: true,
    //     text: "1MB 이하의 파일만 업로드 가능합니다.",
    //     position: "top",
    //     // no confirm button
    //     showConfirmButton: false,
    //   });
    //   return;
    // }
   
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1]) return file[1];
      })
      .filter((file) => file !== undefined);

    if (files.length + newFiles.length > 5) {
      // Display an error message or prevent further file uploads
      Swal.fire({
        toast: true,
        text: "최대 5장까지 업로드 가능합니다.",
        position: "top",
        // no confirm button
        showConfirmButton: false,
      });
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }

    // s3에 업로드하는 함수
    const handleMuliFileUpload = async () => {
      // console.log("files", files);
      const promises = files.map((file) => uploadFile(file));
      const data = await Promise.all(promises);
      let imgArr=[]
      for(let i=0; i<data.length; i++){
        imgArr.push(data[i]["Location"])
      }
      setReviewData({
        ...reviewData,
        imageUrlList:imgArr
      })
      // console.log("all files uploaded", data[0]["Location"]);
    }

    const uploadFile = async (file: File) => {
      const upload = new AWS.S3.ManagedUpload({
        params: {
          ACL: "public-read",
          Body: file,
          Key: "review/" + file.name,
          Bucket: process.env.AWS_BUCKET_NAME as string,
        },   
      });

      const promise = upload.promise();
      return promise.then(
        (data) => {
          console.log("data", data);
          return data;
        },
        (err) => {
          console.log("err", err);
          return err;
        }
      );
      }
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">사진을 선택해주세요.</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          최대 5장까지 업로드 가능합니다.
        </span>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-8">
        <div>
          <span className="text-lg font-semibold">Image</span>
          <div className="mt-5 ">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      ref={imageRef}
                      className="sr-only"
                      onChange={(event) => handleFileDrop(event)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          { files.length > 0 && (
            files.map((file,idx) => {
              return (
                <div key={idx}>
                <Image src={URL.createObjectURL(file)} alt="image" width={100} height={100} />
                </div>
              )
            })
          )}
        </div>
        <button
          type = "button"
          onClick={handleMuliFileUpload}
        >
          upload
        </button>
      </div>
    </>
  );
};

export default ReviewImg;
