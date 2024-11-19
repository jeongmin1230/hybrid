'use client'

import { useRouter } from "next/navigation";

export default function Result() {
    const router = useRouter();
    const handleLoginRedirect = () => {
        window.history.replaceState(null, '', '/');    
        router.replace('/');
        setTimeout(() => {
          window.location.href = '/';
        }, 0);
      };
    return (
        <div className='page-content'>
          <legend>아이디 찾기 결과</legend>
          <div className="result-container">
            결과 : {JSON.parse(localStorage.getItem('id'))?.id || '아이디'}
          </div>
          <br/>
          <button className="change-password-btn" id="findId-to-changePassword" onClick={e => {
            e.preventDefault();
            router.push('../findpassword')
          }}>비밀번호 변경</button>
          <button className="login-btn" id="findId-login" onClick={handleLoginRedirect}>로그인</button>
      </div>
    );
}