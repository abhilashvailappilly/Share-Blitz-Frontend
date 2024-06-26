import axios from "axios";

const upload =async (imgData: string, setErr: (error: string) => void , type: string = "image") => {
  try {
    const image = await fetch(imgData);
    const blob = await image.blob();
    const file = new File([blob], "filename.png", { type: blob.type });
    // console.log('file',file)
    // console.log('image',image)
 
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shareblitz");
    formData.append("cloud_name", "dedoqbb6x");
    formData.append('folder',"/ShareBlitz/Post/")
    const response = await  axios.post(
      `https://api.cloudinary.com/v1_1/dedoqbb6x/${type}/upload`,
      formData
    )
    console.log(response)
    if(response){
      setErr("upload_success");
      return response?.data
    }

  } catch (error :any) {
    setErr(error?.message || "Unknown error occurred");
    console.log(error)
  }

}
export default upload;
