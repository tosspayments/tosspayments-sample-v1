import { useSearchParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export function FailPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="result wrapper">
    <div className="box_section">  
      <h2 style={{padding: "20px 0px 10px 0px"}}>
          <img
            width="30px"
            src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
          />
          결제 실패
      </h2>
      <p>{`code = ${searchParams.get("code")}`}</p>
      <p>{`message = ${searchParams.get("message")}`}</p>

      <div className="result wrapper">
      <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
          <button className="button" style={{ marginTop: '30px', marginRight: '10px' }}>
            연동 문서
          </button>
        </Link>
        <Link to="https://discord.gg/A4fRFXQhRu">
          <button className="button" style={{ marginTop: '30px', backgroundColor: '#e8f3ff', color: '#1b64da' }}>
            실시간 문의
          </button>
        </Link>
      </div>   

  </div>
</div>

  );
}
