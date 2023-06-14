import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { NextPage } from "next";
import { formats, modules } from "./ModulesFormat";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  content: string;
  setContent: any;
}

const TextEditor: NextPage<Props> = ({ content, setContent }) => {
  return (
    <>
      <div>
        <QuillEditor
          style={{
            width: "100%",
            height: "380px",
          }}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
      </div>
    </>
  );
};

export default TextEditor;
