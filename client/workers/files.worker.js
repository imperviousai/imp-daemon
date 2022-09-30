let files = [];

self.addEventListener("message", (event) => {
  const { name, type, id, action, chunk, did, from } = event.data;
  if (action) {
    if (action === "download") {
      console.log("prepping file for download: ", id);
      const f = files.find((f) => f.id === id);
      if (!f) {
        console.log("File is unavailable for download: ", id);
        return;
      }
      // console.log("FILE TO DOWLOAD: ", f);
      const blob = new Blob(f.chunks, { type });
      const file = new File([blob], name, { type });
      // console.log("BLOB TO DOWNLOAD: ", blob);
      // console.log("FILD TO DOWNLOAD: ", fileObj);
      self.postMessage({ id, file, did, from });
      // remove the file after download?
      // files = files.filter((f) => f.id !== id);
    }
    if (action === "abort") {
      console.log("abording file transfer");
      files = [];
    }
  } else {
    // console.log("Adding a recieved file chunk: ", chunk);
    const f = files.find((f) => f.id === id);
    if (f) {
      f.chunks.push(chunk);
      files = files.map((file) => {
        return file.id === f.id ? f : file;
      });
      return;
    }
    files = [...files, { id, chunks: [chunk] }];
  }
});
