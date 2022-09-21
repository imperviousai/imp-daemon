import { useEffect, useRef, useCallback, useContext, useState } from "react";
import MainNavigation from "../../../components/MainNavigation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";
import { saveAs } from "file-saver";
import { useFetchFiles } from "../../../hooks/files";
import { detectFile, fetchFileById } from "../../../utils/files";

// shoutout to the next-editorjs repo for all the help
export default function ViewFile() {
  const router = useRouter();
  const videoRef = useRef();
  const [file, setFile] = useState();
  const [html, setHtml] = useState();
  const [plain, setPlain] = useState();
  const [unknownType, setUnkownType] = useState(false);

  const { id } = router.query;

  const fetchFilesSuccess = (data) => {
    let cid = data?.data.files.find((cid) => cid.split("/")[2] === id);
    if (cid) {
      cid = cid.split("/")[2];
      fetchFileById(cid).then(async (res) => {
        let byteString = atob(res.data.data);
        const file = await detectFile(byteString, cid);
        console.log(file);
        if (file) {
          setFile(file);
        }
      });
    }
  };

  const { data: files } = useFetchFiles(fetchFilesSuccess);

  const pages = [
    { name: "Files", href: "/d/files", current: false },
    { name: id ? id : "", href: "", current: true },
  ];

  const handleVideo = useCallback((video) => {
    const newObjectUrl = URL.createObjectURL(video);
    videoRef.current.src = newObjectUrl;
    videoRef.current.play();
  }, []);

  const handleHtml = useCallback((file) => {
    // get the HTML first
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      setHtml(reader.result);
    };
  }, []);

  const handlePlain = useCallback((file) => {
    // get the HTML first
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      setPlain(reader.result);
    };
  }, []);

  useEffect(() => {
    if (id && files) {
      if (file) {
        if (/video\/*/.test(file.type)) {
          handleVideo(file);
          return;
        } else if (file.type === "text/html") {
          handleHtml(file);
        } else if (file.type === "text/plain") {
          handlePlain(file);
        } else {
          setUnkownType(true);
          toast.error(
            "Unable to process file type. Type is currently unsupported"
          );
        }
      }
    }
  }, [id, handleVideo, files, handleHtml, handlePlain, file]);

  return (
    <MainNavigation currentPage="Files" hideNav={false}>
      {file && <button onClick={() => saveAs(file)}>Download</button>}
      <video ref={videoRef} loop />
      {html && (
        <div>
          {ReactHtmlParser(
            html.replace("<!DOCTYPE html><html>", "").replace("</html>", "")
          )}
        </div>
      )}
      {plain && <div>{plain}</div>}
      {unknownType && file && (
        <>
          <p>
            Unable to render this file for viewing. Would you like to download
            it instead and view locally?
          </p>
        </>
      )}
    </MainNavigation>
  );
}
