'use client'

import { useEffect, useState } from 'react';
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
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/;
      const [password, setPassword] = useState('');
      const [isAppropriate, setIsAppropriate] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [isMatch, setIsMatch] = useState('');
      const [isButtonDisabled, setIsButtonDisabled] = useState(true);

      useEffect(() => {
        if(passwordRegex.test(password)) {
          setIsAppropriate('적절한 비밀번호 입니다.');
        } else if(password.trim() === "") {
          setIsAppropriate('비밀번호를 입력 해 주세요.');
        } else {
          setIsAppropriate('8자~20자 사이의 대문자, 소문자, 특수문자 조합의 비밀번호만 사용 가능합니다.');
        }
      }, [password])

      useEffect(() => {
        if(confirmPassword.trim() !== "" && (password.trim() === confirmPassword.trim())) {
          setIsMatch('처음 입력한 비밀번호와 일치합니다.');
        } else if(confirmPassword.trim() === "") {
          setIsMatch('처음 입력한 비밀번호를 다시 입력 해 주세요.')
        } else {
          setIsMatch('처음 입력한 비밀번호와 다릅니다.');
        }
      }, [password, confirmPassword])

      useEffect(() => {
        if (passwordRegex.test(password) && 
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        isMatch === '처음 입력한 비밀번호와 일치합니다.') {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
        }
      }, [password, confirmPassword, isMatch]);

    return (
        <div className='page-content'>
        <form onSubmit={e=>{
            e.preventDefault();
            const pw = e.target.password.value;
            const options = {
              method: 'PATCH',
              headers: {
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify({pw: pw})
            }
            fetch(`${process.env.NEXT_PUBLIC_API}users/${JSON.parse(localStorage.getItem('id'))?.id || '아이디'}`, options)
            .then(res => res.json())
            .then(()=> {
              router.push('/');
              alert('비밀번호를 변경 했습니다.\n변경 된 비밀번호로 다시 로그인 해 주세요.');
            })
        }}>
            <legend>비밀번호 변경</legend>
            <div className="input-container">
                <label htmlFor="password">비밀번호</label>
                <div className='input-wrapper'>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <span className={`hint ${isAppropriate === '적절한 비밀번호 입니다.' ? 'hint-success' : isAppropriate.includes('가능합니다') ? 'hint-error' : ''}`}>
                        {isAppropriate}
                    </span>
                    </div>
                    </div>
          <div className="input-container">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <div className='input-wrapper'>
              <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className={`hint ${isMatch === '처음 입력한 비밀번호와 일치합니다.' ? 'hint-success' : isMatch === '처음 입력한 비밀번호와 다릅니다.' ? 'hint-error' : ''}`}>
              {isMatch}
              </span>         
              </div>
          </div>
          <input type='submit' id="findpassword-changepassword" value="로그인" onClick={handleLoginRedirect} disabled={isButtonDisabled}/>
            </form>
          
      </div>
    );
}