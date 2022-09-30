import { useRef } from "react";
import { PlusSmIcon } from "@heroicons/react/solid";
import { v4 as uuidv4 } from "uuid";

function FileUploader({ setFile, disabled }) {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    hiddenFileInput.current.value = null;
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        <PlusSmIcon
          className="h-10 w-10 text-gray-600 font-light"
          aria-hidden="true"
        />
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
        disabled={disabled}
      />
    </>
  );
}

export default FileUploader;
