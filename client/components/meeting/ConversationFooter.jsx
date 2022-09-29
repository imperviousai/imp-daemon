import React, { useState, useRef, useEffect } from "react";
import { ArrowCircleRightIcon, XIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import FileUploader from "../FileUploader";
import SelectedFileInput from "../SelectedFileInput";
import useAutosizeTextArea from "../../components/useAutosizeTextArea";
import { v4 as uuidv4 } from "uuid";

//  this needs to be reworked with flex grow
const ConversationFooter = ({ sendPeerMessage, peers }) => {
  const chunkSize = 1048576 * 3; //its 3MB, increase the number measure in mb
  const [messageInput, setMessageInput] = useState("");
  const [fileInput, setFileInput] = useState();
  const [counter, setCounter] = useState(1);
  const [sendingFile, setSendingFile] = useState({});
  const [startingChunk, setStartingChunk] = useState(0);
  const [endingChunk, setEndingChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, messageInput);

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
  }, [sendingFile, progress]);

  const startWebRTCFileTransfer = () => {
    resetChunkProperties();
    setFileSize(fileInput.size);
    const _totalCount =
      fileInput.size % chunkSize == 0
        ? fileInput.size / chunkSize
        : Math.floor(fileInput.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
    setChunkCount(_totalCount);
    console.log("fileInput", fileInput);
    setSendingFile(fileInput);
    setFileId(uuidv4());
  };

  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      const { name, type } = sendingFile;
      var chunk = sendingFile.slice(startingChunk, endingChunk);
      sendPeerMessage(
        { name, type, id: fileId, data: chunk },
        "file-transfer-chunk"
      );
      setStartingChunk(endingChunk);
      setEndingChunk(endingChunk + chunkSize);
      if (counter == chunkCount) {
        console.log("Process is complete, counter", counter);
        setProgress(100);
        completeFileSending();
      } else {
        var percentage = (counter / chunkCount) * 100;
        setProgress(percentage);
        console.log("SENDING FILE TRANSFER, PERCENTILE", percentage);
        console.log("CHUNK: ", chunk);
      }
    }
  };

  const resetChunkProperties = () => {
    setProgress(0);
    setCounter(1);
    setStartingChunk(0);
    setEndingChunk(chunkSize);
  };

  const sendMessage = (e) => {
    if (fileInput) sendFile();
    if (peers.length === 0) {
      toast.error("Start a call with someone to use ephemeral chat.");
      return;
    }
    messageInput.length > 0 && sendPeerMessage(messageInput, "chat-message");
    setMessageInput("");
  };

  const completeFileSending = () => {
    // id references the file that the other peer has locally to download from the worker
    const { name, type, size } = fileInput;
    console.log("File transfer is complete: ", fileInput);
    sendPeerMessage({ name, type, size, id: fileId }, "file-transfer-done");
    setFileInput();
    setSendingFile();
    setProgress(0);
  };

  const sendFile = () => {
    console.log("Sending file: ", fileInput.name);
    startWebRTCFileTransfer();
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      setMessageInput(`${messageInput}`);
      return;
    }
    if (e.key === "Enter") {
      sendMessage();
      return;
    }
  };

  // BUG: setMsg("") when using a <textarea> seems to instead set state to "\n"
  // even in a default CRA application. For now, this will do.
  const handleChange = (e) => {
    if (e.target.value !== "\n") {
      setMessageInput(e.target.value);
    }
  };

  return (
    <>
      {fileInput && (
        <SelectedFileInput
          fileInput={fileInput}
          setFileInput={setFileInput}
          progress={progress}
        />
      )}
      <div className="flex flex-row w-full items-end">
        <textarea
          type="text"
          name="message"
          id="message"
          ref={textAreaRef}
          className="shadow-sm pl-2 pt-2 block w-full sm:text-sm border border-grey-100 rounded-md"
          placeholder="Type message here ..."
          onKeyDown={handleKeyDown}
          value={messageInput}
          onChange={handleChange}
        />
        <div className="flex">
          <FileUploader setFile={setFileInput} />
          <button
            type="button"
            onClick={() => sendMessage()}
            disabled={peers.length === 0}
            className="mx-1"
          >
            <ArrowCircleRightIcon
              className="h-10 w-10 text-secondary"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ConversationFooter;
