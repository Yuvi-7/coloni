import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export const uploadAssets = async (file: any, id: any) => {
  const storageRef = ref(storage, id);
  const snapshot = await uploadBytes(storageRef, file);

  if (snapshot) {
    const fileURL = await getDownloadURL(snapshot.ref);
    return fileURL?.length > 0 ? fileURL : false;
  }
};
