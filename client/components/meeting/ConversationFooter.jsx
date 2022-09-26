import React, { useState, useRef } from "react";
import { ArrowCircleRightIcon, XIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import FileUploader from "../FileUploader";
import SelectedFileInput from "../SelectedFileInput";
import { encode } from "base64-arraybuffer";
import useAutosizeTextArea from "../../components/useAutosizeTextArea";

//  this needs to be reworked with flex grow
const ConversationFooter = ({ sendPeerMessage, peers }) => {
  const [messageInput, setMessageInput] = useState("");
  const [fileInput, setFileInput] = useState([]);

  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, messageInput);

  const sendMessage = (e) => {
    if (fileInput) sendFiles();
    if (peers.length === 0) {
      toast.error("Start a call with someone to use ephemeral chat.");
      return;
    }
    messageInput.length > 0 && sendPeerMessage(messageInput, "chat-message");
    setMessageInput("");
  };

  // TODO: logic to send file-transfer-start && file-transfer-done message types
  const sendFiles = () => {
    if (fileInput.length > 0) {
      fileInput.forEach((f) => sendFile(f));
    }
  };

  const removeFile = (id) => {
    setFileInput((prev) => prev.filter((f) => f.id !== id));
  };

  const setFileState = (id, state) => {
    setFileInput((prev) =>
      prev.map((f) => {
        return f.id === id ? { ...f, isUploading: state } : f;
      })
    );
  };

  const completeFileSending = (f) => {
    // id references the file that the other peer has locally to download from the worker
    console.log("File transfer is complete: ", f);
    const {
      file: { name, type, size },
      id,
    } = f;
    sendPeerMessage({ name, type, size, id }, "file-transfer-done");
    setFileState(f.id, false);
    removeFile(f.id);
  };

  const sendFile = (f) => {
    const { name, type } = f.file;
    console.log("Sending file: ", name);
    setFileState(f.id, true);

    f.file.arrayBuffer().then((buffer) => {
      const chunkSize = 16 * 1024;
      while (buffer.byteLength) {
        const chunk = buffer.slice(0, chunkSize);
        buffer = buffer.slice(chunkSize, buffer.byteLength);
        // turn ArrayBuffer to string to fit inside JSON object
        const base64chunk = encode(chunk);
        sendPeerMessage(
          { name, type, id: f.id, data: base64chunk },
          "file-transfer-chunk"
        );
      }
      completeFileSending(f);
    });
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
      setMsg(e.target.value);
    }
  };

  return (
    <>
      <SelectedFileInput fileInput={fileInput} setFileInput={setFileInput} />
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
