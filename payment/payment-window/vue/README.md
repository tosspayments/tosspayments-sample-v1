# payment-window/vue

Vue를 이용한 결제창 샘플입니다.

## 실행하기

1. 의존성 패키지를 다운로드하고 서버를 실행합니다.

   ```sh
   $ npm install # 의존성 패키지 다운로드
   $ npm run serve # 서버 실행
   ```

2. 로컬 환경에서 샘플 프로젝트를 확인하세요.

\* Vue는 결제창을 호출하는 클라이언트 코드만 참고하세요. Front side 언어 특성상 승인 API의 Authorization이 외부에 노출될 수 밖에 없습니다. 승인 API를 호출 로직은 Server side 언어를 사용하여 구현하세요.
