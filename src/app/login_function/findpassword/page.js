'use client'

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Findpassword() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (name.trim() && id.trim() && phone.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, id, phone]);

    return (
      <div className='page-content'>
        <form onSubmit={e=>{
          e.preventDefault();
          fetch(`${process.env.NEXT_PUBLIC_API}users?name=${name}&id=${id}&phone=${phone}`)
            .then((res) => res.json())
            .then((users) => {
              if (users.length > 0) {
                localStorage.setItem('id', JSON.stringify({ id: users[0].id}));
                router.push('/login_function/findpassword/changepassword')
              } else {
                console.log("일치하는 사용자가 없습니다.");
              }
            })
            .catch((error) => {
              console.error("오류 발생:", error);
            });
        }}>
          <legend>비밀번호 찾기</legend>
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
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
              value="입력"
              id="findPassword-btn"
              disabled={isButtonDisabled}
            />
          </div>
        </form>
      </div>
    );
  }
  