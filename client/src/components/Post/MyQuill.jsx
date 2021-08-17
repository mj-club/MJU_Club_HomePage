import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form";

const MyQuill = () => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  const {  register } = useForm({
    mode: "onBlur"
  });

  return (
    <>
    <style type="text/css">
      {`
        .my-editing-area {
          height: 30rem;
          border-radius: 0px 0px 5px 5px;
        }
        .ql-toolbar.ql-snow{
          border-radius: 5px 5px 0px 0px;
        }
      `}
    </style>
    <div className="text-editor">
      <ReactQuill className="mb-2 editor" theme="snow"
                  modules={modules}
                  formats={formats}>
                    <div className="my-editing-area"  name="content" ref={register()} />
      </ReactQuill>
    </div>
    </>
 
 
    );
  }


export default MyQuill;
