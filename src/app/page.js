'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [id, password]);

  return (
    <div className='page-content'>
      <form onSubmit={e=>{
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API}users?id=${id}&pw=${password}`)
          .then(res => res.json())
          .then(users => {
            if (users.length > 0) {
              const user = users[0];
              localStorage.setItem('user', JSON.stringify({ name: user.name }));
              router.push(`/main`);
              router.refresh();
            } else {
              alert("로그인 실패: 입력한 아이디 또는 비밀번호가 잘못되었습니다.");
            }
          })
          .catch(error => {
            console.log('로그인 중 오류 발생 : ', error);
          });
      }}>
        <fieldset>
          <legend>로그인</legend>
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
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="submit-container">
            <input
              type="submit"
              value="로그인"
              id="login-btn"
              disabled={isButtonDisabled}
            />
          </div>
          <p className='link-container'>
            <Link href='/login_function/signup'>회원가입</Link>
            <Link href='/login_function/findid'>아이디 찾기</Link>
            <Link href='/login_function/findpassword'>비밀번호 찾기</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}
