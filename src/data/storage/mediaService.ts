import * as ImageManipulator from 'expo-image-manipulator';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/data/firebase/firebase';

export interface UploadedMedia { fullUrl: string; thumbnailUrl?: string }

async function uriToBlob(uri: string) {
  const response = await fetch(uri);
  return response.blob();
}

export async function uploadOptimizedImage(params: { uri: string; familyId: string; userId: string; folder: string }): Promise<UploadedMedia> {
  const basePath = `families/${params.familyId}/${params.folder}/${params.userId}/${Date.now()}`;
  const full = await ImageManipulator.manipulateAsync(
    params.uri,
    [{ resize: { width: 1080 } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
  );
  const thumb = await ImageManipulator.manipulateAsync(
    params.uri,
    [{ resize: { width: 320 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
  );
  const [fullBlob, thumbBlob] = await Promise.all([uriToBlob(full.uri), uriToBlob(thumb.uri)]);
  const fullRef = ref(storage, `${basePath}/full.jpg`);
  const thumbRef = ref(storage, `${basePath}/thumb.jpg`);
  await Promise.all([
    uploadBytes(fullRef, fullBlob, { contentType: 'image/jpeg' }),
    uploadBytes(thumbRef, thumbBlob, { contentType: 'image/jpeg' }),
  ]);
  const [fullUrl, thumbnailUrl] = await Promise.all([getDownloadURL(fullRef), getDownloadURL(thumbRef)]);
  return { fullUrl, thumbnailUrl };
}

export async function uploadBinaryMedia(params: { uri: string; familyId: string; userId: string; folder: string; contentType: string }): Promise<UploadedMedia> {
  const mediaRef = ref(storage, `families/${params.familyId}/${params.folder}/${params.userId}/${Date.now()}`);
  await uploadBytes(mediaRef, await uriToBlob(params.uri), { contentType: params.contentType });
  return { fullUrl: await getDownloadURL(mediaRef) };
}
