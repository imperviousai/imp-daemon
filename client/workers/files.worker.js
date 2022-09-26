let files = [];

self.addEventListener("message", (event) => {
  const { name, type, id, action, chunk } = event.data;
  if (action) {
    if (action === "download") {
      console.log("prepping file for download: ", id);
      const f = files.find((f) => f.id === id);
      if (!f) {
        console.log("File is unavailable for download: ", id);
        return;
      }
      const blob = new Blob(f.chunks);
      const fileObj = new File([blob], name, { type });
      self.postMessage(fileObj);
      //   remove the file after download?
      //   files = files.filter((f) => f.id !== id);
    }
    if (action === "abort") {
      console.log("abording file transfer");
      files = [];
    }
  } else {
    const f = files.find((f) => f.id === id);
    if (f) {
      f.chunks.push(chunk);
      files = files.map((file) => {
        return file.id === f.id ? f : file;
      });
      return;
    }
    files = [...files, { name, type, id, chunks: [chunk] }];
  }
});
