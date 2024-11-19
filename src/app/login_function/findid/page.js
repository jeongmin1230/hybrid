'use client'

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function FindId() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (name.trim() && phone.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, phone]);

    return (
      <div className='page-content'>
        <form onSubmit={e=>{
          e.preventDefault();
          fetch(`${process.env.NEXT_PUBLIC_API}users?name=${name}&phone=${phone}`)
            .then((res) => res.json())
            .then((users) => {
              if (users.length > 0) {
                localStorage.setItem('id', JSON.stringify({ id: users[0].id}));
                router.push('/login_function/findid/result')
              } else {
                console.log("일치하는 사용자가 없습니다.");
              }
            })
            .catch((error) => {
              console.error("오류 발생:", error);
            });
        }}>
          <legend>아이디 찾기</legend>
          <div className="input-container">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="phone">핸드폰번호</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="submit-container">
            <input
              type="submit"
              value="아이디찾기"
              id="findId-btn"
              disabled={isButtonDisabled}
            />
          </div>
        </form>
      </div>
    );
  }
  