"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function NoticeList({id, title, date}) {
    return (
        <div>
            <Link href={`/read/${id}`}>{title}</Link>
            <h6 className='end-form'>{date}</h6>
        </div>
    );
}

export function Button({name}) {
    const router = useRouter();
    const back = () => {
        router.back();
      };

    return (
        <div>
            <button onClick={back}>{name}</button>
        </div>
    );
}