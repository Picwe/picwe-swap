import axios from 'axios';

const boundary = '----WebKitFormBoundary7TMYhSONfkAM2z3a';
const VITE_IPFS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYjc0NTZlZC0wZjNkLTQ5YjItYjdjOS1iNWViMmZjMDM0ZmEiLCJlbWFpbCI6InRhbnFpeW91QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmMzY3ZjVlZGUyODZjODY1NmQ5ZCIsInNjb3BlZEtleVNlY3JldCI6IjI0MjkyMDkwZGFiMjM1MGEzZDA0YTQ5Yzg1ZjU2NjdkZTZjODQwODZiZjI5YzUyMGZiMTgxYmFkMTBlMjRlZjEiLCJpYXQiOjE3MDQxODUxMzV9.zFgXzWTvjM8u9fIJC3JpI4CawlJELK6YzO0yAtmxQCo';

export function pinFileToIPFS(file: any) {
  return new Promise((resolve, reject) => {
    const fileSizeInMb = file.size / (1024 * 1024);
    if (fileSizeInMb >= 1) reject(new Error('文件大小不能超过 1MB'));

    const formData = new FormData();
    formData.append('file', file);
    const pinataMetadata = JSON.stringify({
      name: 'File name'
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0
    });
    formData.append('pinataOptions', pinataOptions);

    axios
      .post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          Authorization: `Bearer ${VITE_IPFS_TOKEN}`
        }
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
