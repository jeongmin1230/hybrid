'use client';

import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.replace('/');
  };
  const moveTo = (route) => {
    router.push(route);
  }

  return (
    <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ fontSize: '24px' }}>환영합니다! {JSON.parse(localStorage.getItem('user'))?.name || '게스트'}님</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
    <button onClick={() => moveTo('/notice_registration')}>공지사항 작성</button>
  </div>
  );
}
