'use client'

import UserInfo from '../UserInfo';
import { useRouter } from 'next/navigation';

export default function NoticePage() {
    const router = useRouter();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}년${String(currentDate.getMonth() + 1).padStart(2, '0')}월${String(currentDate.getDate()).padStart(2, '0')}일 ${String(currentDate.getHours()).padStart(2, '0')}시${String(currentDate.getMinutes()).padStart(2, '0')}분${String(currentDate.getSeconds()).padStart(2, '0')}초`;

    return (
        <div>
            <UserInfo />
            <br />
            <form onSubmit={e => {
                e.preventDefault();
                const title = e.target.title.value;
                const body = e.target.body.value;                const date = e.target.date.value;
                const registrant = JSON.parse(localStorage.getItem('user')).name;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, body, registrant, date })
                };
                fetch(`${process.env.NEXT_PUBLIC_API}notice`, options)
                    .then(res => res.json())
                    .then(_ => {
                        router.push('../main');
                        router.refresh();
                    });
            }}>
                <p><input type='text' id='notice_title' name='title' placeholder='공지 제목' /></p>
                <p><textarea name='body' id='notice_body' placeholder='공지 내용' /></p>
                <p className='regist_date'>작성 시간: <input type='text' name='date' className='regist_date' value={formattedDate} readOnly /></p>
                <p><input type='submit' value="등록" /></p>
            </form>
        </div>
    );
}