import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const axiosInstance = axios.create({
  baseURL: DOMAIN,
});

interface IFile {
  url: string;
  name: string;
}

export const fileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post<IFile>("/file/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

export default axiosInstance;
