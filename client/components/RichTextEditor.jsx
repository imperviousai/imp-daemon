import { useState, useRef, useEffect, useContext, useCallback } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { on, off } from "../utils/events";
import Delta from "quill-delta";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import { draftStore, draftLocalStateStore } from "../stores/peers";
import { v4 as uuidv4 } from "uuid";

// TODO: Need to handle background auto saving, if 1 user visits another page and another peer
// is still typing on that document, the first peer does not get the updates because the component
// unmounts

const RichTextEditor = ({ docId, documentRef, showAutoSave, peers, myDid }) => {
  const [quill, setQuill] = useState();
  const change = useRef(new Delta());
  const quillRef = useRef();

  const saveDraftLocalState = useCallback(() => {
    if (quillRef.current && docId) {
      draftLocalStateStore.setItem(docId, {
        contents: quillRef.current.editor.getContents(),
        lastUpdated: new Date().toString(),
        created: new Date().toString(),
        owner: myDid?.id,
      });
    }
  }, [myDid?.id, docId]);

  const restoreDocumentDraft = useCallback((msg) => {
    if (msg && quillRef.current) {
      draftLocalStateStore
        .getItem(msg.detail.id)
        .then((doc) => {
          if (doc) {
            quillRef.current.editor.setContents(doc.contents);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    on("save-draft-local-state", saveDraftLocalState);
    return () => {
      on("save-draft-local-state", saveDraftLocalState);
    };
  }, [saveDraftLocalState]);

  useEffect(() => {
    on("restore-document-draft", restoreDocumentDraft);
    return () => {
      on("restore-document-draft", restoreDocumentDraft);
    };
  }, [restoreDocumentDraft]);

  const sendQuillDelta = useCallback(
    (message) => {
      const data = {
        type: "quill-delta-update",
        from: myDid?.id,
        data: message,
        timestamp: new Date().toString(),
        networkId: docId,
      };
      peers.forEach((p) => {
        if (p.peer._channelReady) {
          p.peer.write(JSON.stringify(data));
        }
      });
    },
    [docId, myDid?.id, peers]
  );

  useEffect(() => {
    const q = quillRef.current.getEditor();
    documentRef.current = q; // for parent access
    setQuill(q);
  }, [documentRef]);

  useEffect(() => {
    // pull latest document from local storage and save
    draftStore
      .getItem(docId)
      .then((doc) => {
        if (doc) {
          quillRef.current.editor.setContents(doc.contents);
        }
      })
      .catch((err) => console.log(err));
  }, [docId]);

  // autosave interval to save every 3 seconds
  useEffect(() => {
    setInterval(() => {
      if (change.current.length() > 0) {
        if (quillRef.current) {
          draftStore
            .getItem(docId)
            .then((doc) => {
              if (doc) {
                return draftStore.setItem(docId, {
                  ...doc,
                  contents: quillRef.current.editor.getContents(),
                  lastUpdated: new Date().toString(),
                });
              } else {
                console.log("no doc");
                if (docId === undefined) return;
                return draftStore.setItem(docId, {
                  contents: quillRef.current.editor.getContents(),
                  lastUpdated: new Date().toString(),
                  created: new Date().toString(),
                  owner: myDid?.id,
                });
              }
            })
            .then(() => {
              showAutoSave();
              change.current = new Delta();
            })
            .catch((err) => console.log(err));
        }
      }
    }, 3 * 1000);
  }, [docId, showAutoSave, myDid?.id]);

  useEffect(() => {
    if (quill == null) return;
    const handler = (delta, oldDelta, source) => {
      switch (source) {
        case "user":
          sendQuillDelta(delta);
          change.current = change.current.compose(delta);
          break;
        case "api":
          change.current = change.current.compose(delta);
          break;
        default:
          break;
      }
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quillRef, sendQuillDelta, quill]);

  const updateContents = useCallback(
    ({ detail: { data } }) => {
      if (!quill) return;
      quill.updateContents(data);
    },
    [quill]
  );

  useEffect(() => {
    if (!quill) return;

    on("quill-delta-update", updateContents);

    return () => {
      off("quill-delta-update", updateContents);
    };
  }, [quill, updateContents]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "code-block",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      className="w-full h-full"
      placeholder="Start your journey ..."
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
};

export default RichTextEditor;
