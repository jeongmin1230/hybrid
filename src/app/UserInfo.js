'use client';

import { useRouter } from 'next/navigation';

function UserInfo() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.replace('/');
      };
      return (
        <div className='header'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '16px' }}>로그인 사용자 : {JSON.parse(localStorage.getItem('user'))?.name || '게스트'}님</h1>
        <button onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
      );
}

export default UserInfo;