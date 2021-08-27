import React, {
  useState, 
  // useEffect 
} from "react";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { useDispatch } from "react-redux";
// import MyQuill from "./MyQuill";


const PostForm = () => {

  // const dispatch = useDispatch();

  const [content, setContent] = useState('');

  // let quillRef = null;      // Quill instance
  // let reactQuillRef = null; // ReactQuill component

  // useEffect(() => {
  //   attachQuillRefs()
  // },);

  // const attachQuillRefs = () => {
  //   if (typeof reactQuillRef.getEditor !== 'function') return;
  //   const editor = reactQuillRef.getEditor();
  //   quillRef  = reactQuillRef.makeUnprivilegedEditor(editor);
  // }

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });

  const onSubmit = (InputData) => {
    const fullData = Object.assign(InputData, {content});
    console.log(fullData);
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', { 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  return (
    <>
      <style type="text/css">
        {`
        input.postform{
          background : #fff;
          background-color : #fff;
          border-color : #ccc;
        }
        .form-select{
          width: 100%;
          min-height: 56px;
          padding: 3px 20px;
          color: #9F9F9F;
          border-radius: 5px;
          outline: none;
        }
        .ql-container.ql-snow{
          height: 30rem;
          border-radius: 0px 0px 5px 5px;
        }
        .ql-toolbar.ql-snow{
          border-radius: 5px 5px 0px 0px;
        }
      `}
      </style>

      <form onSubmit={handleSubmit(onSubmit)}>
        <select className="mb-2 form-select" name="category" ref={register({required:true})}>
          <option value="공지사항">공지사항</option>
        </select>

        <input className="mb-2 postform" type="text" placeholder="제목" name="title"
          ref={register({required:"제목을 입력해주세요"})}
        />


        <ReactQuill className="mb-2 editor" theme="snow"
                  modules={modules}
                  value={content} onChange={setContent}
                  // ref={(el) => { reactQuillRef = el }}
                  >
        </ReactQuill>

        <p className="text-right"><input type="checkbox" name="isTop" ref={register()} />상단 고정</p>


        {errors.title && <p>{errors.title.message}</p>}


        <div className="text-center">
          <input type="submit" className="btn btn-primary btn-hover-secondary" value="글쓰기"
          />
        </div>



          
        {/* <div dangerouslySetInnerHTML={{__html: content}}></div>
        {content} */}
        {/* <MyQuill /> */}
      </form>
    </>
  );
}

export default PostForm;