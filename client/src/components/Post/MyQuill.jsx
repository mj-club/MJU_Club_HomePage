import React from "react";
import { Component } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class MyQuill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  style = {
    boder:"1px solid yellow",

  }
  
    
  render() {
    return (
      <>
      <style type="text/css">
        {`
          .my-editing-area {
            height: 500px;
            border-radius: 0px 0px 5px 5px;
          }
          .ql-toolbar.ql-snow{
            border-radius: 5px 5px 0px 0px;
          }
        `}
      </style>
      <div className="text-editor">
        <ReactQuill className="mb-2 editor" theme="snow"
                    modules={this.modules}
                    formats={this.formats}>
                      <div className="my-editing-area"/>
        </ReactQuill>
      </div>
      </>
    );
  }
}

export default MyQuill;
