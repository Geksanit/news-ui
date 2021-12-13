const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result.toString());
    };
  });

export { getBase64 };
