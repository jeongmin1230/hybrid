'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Signup() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isIdDisabled, setIsIdDisabled] = useState(false);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState(false);
  const [password, setPassword] = useState('');
  const [isAppropriate, setIsAppropriate] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatch, setIsMatch] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/;
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
    if (name.trim() !== "" &&
    id.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    phone.trim() !== "" &&
    isMatch === '처음 입력한 비밀번호와 일치합니다.' &&
    selectedOption !== "" &&
    isIdDisabled) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, id, isIdDisabled, password, confirmPassword, isMatch, phone, selectedOption]);

    const handleDuplicateCheck = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9]+$/;

    if (!id.trim()) {
      alert('아이디를 입력해주세요.');
    } else if (!regex.test(id)) {
      alert('아이디는 영어 대소문자와 숫자만 사용할 수 있습니다.');
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API}users?id=${id}`)
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
          alert(`입력한 아이디가 이미 존재합니다.\n다른 아이디를 입력 해 주세요.`)
          setId('');
        } else {
          const isConfirmed = confirm('이 아이디를 사용하시겠습니까?');
          if (isConfirmed) {
            setIsCheckBtnDisabled(true);
            setIsIdDisabled(true);
          } else {
            setIsCheckBtnDisabled(false);
            setId('');
          }
        }
      })
    }
  };
  const handleType = (e) => {
    setSelectedOption(e.target.value);
  };

    return (
    <div className='page-content'>
      <form onSubmit={e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const id = e.target.id.value;
        const pw = e.target.password.value;
        const phone = e.target.phone.value;
        const type = e.target.type.value;
        const korType = type === "manager" ? "관리자" : "사용자";        const options = {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({name, id, pw, phone, type: korType})
        }
        fetch(`${process.env.NEXT_PUBLIC_API}users`, options)
        .then(res => res.json())
        .then(()=> {
          router.push('/');
          alert('회원가입 완료 되었습니다.\n회원가입 한 아이디, 비밀번호로 다시 로그인 해 주세요.');
        })
      }}>
        <fieldset>
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
              disabled={isIdDisabled}
              required
            />
            <button disabled={isCheckBtnDisabled} className='check-duplicate' onClick={handleDuplicateCheck}>중복 체크</button>
          </div>
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
          <div className='input-container'>
            <label htmlFor="type">유형</label>
            <label style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <input id="type" type="radio" value="manager" checked={selectedOption === "manager"} onChange={handleType}/>
              <p><Image src="/images/manager.png" alt='manageer icon' width={30} height={30}/></p>
              <p>관리자</p>
            </label>
            <label style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <input id="type" type="radio" value="general" checked={selectedOption === "general"} onChange={handleType}/>
              <p><Image src="/images/general.png" alt='general icon' width={30} height={30}/></p>
              <p>일반인</p>
            </label>
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