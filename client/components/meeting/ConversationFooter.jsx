import React, { useState, useRef, useEffect } from "react";
import { ArrowCircleRightIcon, XIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import FileUploader from "../FileUploader";
import SelectedFileInput from "../SelectedFileInput";
import useAutosizeTextArea from "../../components/useAutosizeTextArea";
import { v4 as uuidv4 } from "uuid";

//  this needs to be reworked with flex grow
const ConversationFooter = ({ sendPeerMessage, peers }) => {
  const MAXIMUM_MESSAGE_SIZE = 65535;
  const [msg, setMsg] = useState("");
  const [fileInput, setFileInput] = useState();
  const [counter, setCounter] = useState(1);
  const [sendingFile, setSendingFile] = useState();
  const [startingChunk, setStartingChunk] = useState(0);
  const [endingChunk, setEndingChunk] = useState(MAXIMUM_MESSAGE_SIZE);
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, msg);

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
  }, [sendingFile, progress]);

  const startWebRTCFileTransfer = async () => {
    resetChunkProperties();
    setFileId(uuidv4());
    const arrayBuffer = await fileInput.arrayBuffer();
    setFileSize(arrayBuffer.byteLength);
    const _totalCount =
      arrayBuffer.byteLength % MAXIMUM_MESSAGE_SIZE == 0
        ? arrayBuffer.byteLength / MAXIMUM_MESSAGE_SIZE
        : Math.floor(arrayBuffer.byteLength / MAXIMUM_MESSAGE_SIZE) + 1; // Total count of chunks will have been upload to finish the file
    setChunkCount(_totalCount);
    setSendingFile(arrayBuffer);
    // shareFile(fileInput);
  };

  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      var chunk = sendingFile.slice(startingChunk, endingChunk);
      sendPeerMessage({ id: fileId, data: chunk }, "file-transfer-chunk");
      setStartingChunk(endingChunk);
      setEndingChunk(endingChunk + MAXIMUM_MESSAGE_SIZE);
      if (counter == chunkCount) {
        console.log("Process is complete, counter", counter);
        setProgress(100);
        completeFileSending();
      } else {
        var percentage = (counter / chunkCount) * 100;
        setProgress(percentage);
        // console.log("SENDING FILE TRANSFER, PERCENTILE", percentage);
        // console.log("CHUNK: ", chunk);
      }
    }
  };

  const resetChunkProperties = () => {
    setProgress(0);
    setCounter(1);
    setStartingChunk(0);
    setEndingChunk(MAXIMUM_MESSAGE_SIZE);
  };

  const sendMessage = (e) => {
    if (fileInput) sendFile();
    if (peers.length === 0) {
      toast.error("Start a call with someone to use ephemeral chat.");
      return;
    }
    msg.length > 0 && sendPeerMessage(msg, "chat-message");
    setMsg("");
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
    startWebRTCFileTransfer();
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      setMsg(`${msg}`);
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
      setMsg(e.target.value);
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
          value={msg}
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
