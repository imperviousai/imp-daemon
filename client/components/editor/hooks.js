import { useCallback, useState, useEffect } from "react";

const INIT_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Post Something new - Be Universally Discoverable",
        level: 1,
      },
    },
    {
      type: "paragraph",
      data: {
        text: 'Monetize content without an intermediary. Associate this post with your Decentralized Identity ("DID") and become truly impervious',
      },
    },
  ],
};

export const dataKey = "editorData";

export const useSaveCallback = (editor, setContentData) => {
  return useCallback(async () => {
    if (!editor) return;
    try {
      const out = await editor.save();
      console.group("EDITOR onSave");
      console.dir(out);
      localStorage.setItem(dataKey, JSON.stringify(out));
      console.info("Saved in localStorage");
      setContentData(out);
      console.info("Saved in state");
      console.groupEnd();
    } catch (e) {
      console.error("SAVE RESULT failed", e);
    }
  }, [editor, setContentData]);
};

// Set editor data after initializing
export const useSetData = (editor, data) => {
  useEffect(() => {
    if (!editor || !data) {
      return;
    }

    editor.isReady.then(() => {
      // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
      setTimeout(() => {
        editor.render(data);
      }, 100);
    });
  }, [editor, data]);
};

export const useClearDataCallback = (editor) => {
  return useCallback(
    (ev) => {
      ev.preventDefault();
      if (!editor) {
        return;
      }
      editor.isReady.then(() => {
        // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
        setTimeout(() => {
          editor.clear();
        }, 100);
      });
    },
    [editor]
  );
};

// load saved data
export const useLoadData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mimic async data load
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      console.group("EDITOR load data");
      const saved = localStorage.getItem(dataKey);
      if (saved) {
        console.log("We have saved data");
        const parsed = JSON.parse(saved);
        setData(parsed);
        console.dir(parsed);
      } else {
        console.info("No saved data, using initial");
        console.dir(INIT_DATA);
        setData(INIT_DATA);
      }
      console.groupEnd();
      setLoading(false);
    }, 200);

    return () => {
      setLoading(false);
      clearTimeout(id);
    };
  }, []);

  return { data, loading };
};
