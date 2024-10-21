import UserInfo from '../../UserInfo';
import { Button } from '../../client-component';

export default async function Read(props) {
    const noticeId = props.params.id;
    const notice = await fetch(`${process.env.NEXT_PUBLIC_API}notice/${noticeId}`);
    const noticeContent = await notice.json();
    return (
        <div>
            <UserInfo />
            <br/>
            <h2>{noticeContent.title}</h2>
            <p className="end-form">작성 날짜 : {noticeContent.date}</p>
            <p className="end-form">작성자 : {noticeContent.registrant}</p>
            <h3>{noticeContent.body}</h3>
            <Button name="뒤로"/>
        </div>
    )
}