'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (name.trim() && id.trim() && password.trim() && confirmPassword.trim() && phone.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, id, password, confirmPassword, phone]);

    return (
    <div className='page-content'>
      <form onSubmit={e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const id = e.target.id.value;
        const password = e.target.password.value;
        const phone = e.target.phone.value;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({name, id, password, phone})
        }
        fetch(`${process.env.NEXT_PUBLIC_API}users`, options)
        .then(res => res.json())
        .then(success=> {
          router.push('/');
          alert('회원가입 완료 되었습니다.\n회원가입 한 아이디, 비밀번호로 다시 로그인 해 주세요.');
        })
      }}>
        <fieldset>
          <div className="input-container">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="phone">번호</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="submit-container">
            <input
              type="submit"
              value="회원가입"
              id="signup-btn"
              disabled={isButtonDisabled}
            />
          </div>
        </fieldset>
      </form>
    </div>
    );
  }