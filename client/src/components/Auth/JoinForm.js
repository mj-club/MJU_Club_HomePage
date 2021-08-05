import React, { Fragment } from 'react';
import { useForm } from "react-hook-form";

const JoinForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });
  const onSubmit = data => console.log(data);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-12 col-12 mb-4">
          <p>이메일 & 비밀번호</p>
          <input type="email" placeholder="Email *" name="email" ref={register({
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="col-md-12 col-12 mb-4">
          <input type="password" placeholder="Pssword *" name="password" />
        </div>

        <div className="col-md-12 col-12 mb-4">
          <input type="password" placeholder="Check Pssword *" name="check-password" />
        </div>

        <p>개인정보</p>
        <div className="col-md-12 col-12 mb-4">
          <input type="text" placeholder="Your Name *" name="name" ref={register({ required: 'Name is required' })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="col-md-12 col-12 mb-4">
          <input type="text" placeholder="PhoneNumber * ex)01012341234" name="ph" />
        </div>

        <div className="row mb-n4">
          <div className="col-12 mb-6">
            <textarea name="message" placeholder="Message" ref={register({ required: 'Message is required' })}></textarea>
            {errors.message && <p>{errors.message.message}</p>}
          </div>
          <div className="col-12 text-center mb-4">
            <button className="btn btn-primary btn-hover-secondary">Get a free consultation</button>
          </div>
        </div>
      </form>
      <p className="form-messege"></p>
    </Fragment>
  )
}

export default JoinForm;
