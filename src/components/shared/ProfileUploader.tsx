import { convertFileToUrl } from "@/lib/utils";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type ProfileUploaderProps = {
  fieldChange: (file: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(convertFileToUrl(acceptedFiles[0]));
  }, [file]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": ['.png', '.jpg', 'jpeg']
    }
  });

  return (
    <div {...getRootProps()}>
      <input 
        {...getInputProps()}
        className="cursor-pointer"
      />

      <div className="cursor-pointer flex-center gap-4">
        <img 
          src={fileUrl || '/assets/icons/profile-placeholder.svg'}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />

        <p className="text-primary-500 small-regular md:base-semibold">
          Change Profile Photo
        </p>
      </div>
    </div>
  )
}

export default ProfileUploader
