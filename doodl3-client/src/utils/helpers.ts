export function base64ToFile(base64String: string, fileName: string): File {
  // Split the base64 string to get the content type and data
  const parts = base64String.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const data = atob(parts[1]);

  // Create a Uint8Array from the base64 data
  const arr = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    arr[i] = data.charCodeAt(i);
  }

  // Create a File object from the Uint8Array
  const file = new File([arr], fileName, { type: contentType });

  return file;
}
