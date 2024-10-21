'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserInfo from '../UserInfo';
import { NoticeList } from '../client-component';

export default function MainPage() {
  const [noticeList, setNoticeList] = useState([]);
  const router = useRouter();

  const moveTo = (route) => {
    router.push(route);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}notice`)
    .then(res => res.json())
    .then(result => {
      setNoticeList(result);
    });
  }, [])



  return (
    <div>
    <UserInfo />
    <br/>
    <button onClick={() => moveTo('/notice_registration')}>공지사항 작성</button>
    {noticeList.length > 0 ? (
        <ul>
          {noticeList.map((notice, _) => (
              <NoticeList key = {notice.id} id = {notice.id} title={notice.title} date={notice.date}/>
              ))
          }
        </ul>
      ) : (
        <p>공지사항이 없습니다.</p>
      )}
  </div>
  );
}
