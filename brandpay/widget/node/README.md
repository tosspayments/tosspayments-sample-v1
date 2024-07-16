# 브랜드페이 위젯 SDK 연동 샘플 프로젝트

브랜드페이 JavaScript SDK를 이용해 결제 수단을 등록하고 선택하는 UI를 간편하게 구축할 수 있는 샘플 프로젝트입니다.

샘플 프로젝트를 사용한 브랜드페이 연동 방법은 [브랜드페이 위젯 연동 문서](https://docs.tosspayments.com/guides/brandpay/widget)에서 확인하세요.

## 준비하기

샘플 프로젝트를 사용하려면 [Node.js](https://nodejs.org/ko/)가 필요합니다. 먼저 내 컴퓨터의 Node.js 버전을 확인하세요.

```sh
$ node -v
$ v16.15.1
```

[Node.js 홈페이지](https://nodejs.org/ko/download/)에서 환경에 맞는 인스톨러를 다운로드 하거나 [nvm](https://github.com/nvm-sh/nvm#about)(Node Version Manager)을 사용해서 설치하세요.

#### nvm으로 설치하기

[nvm 최신 버전](https://github.com/nvm-sh/nvm/releases)을 확인한 뒤 아래 커맨드의 `{VERSION}`에 추가해서 nvm을 설치합니다. ([참고](https://github.com/nvm-sh/nvm#installing-and-updating))

```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/{VERSION}/install.sh | bash
```

nvm이 설치되었다면 아래 커맨드로 Node.js를 설치할 수 있습니다.

```sh
$ nvm install {NODE_VERSION}
```

## 시작하기

먼저 이 레포지토리를 [클론](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)합니다.

```sh
$ git clone https://github.com/tosspayments/brandpay-sample # 샘플 프로젝트 클론
$ cd brandpay-sample/widget/node
```

의존성 패키지를 다운로드하고 서버를 실행합니다.

```sh
$ npm install   # 의존성 패키지 다운로드
$ node index.js # 서버 실행
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 페이지로 접속합니다.

샘플 프로젝트가 성공적으로 실행되면 아래와 같은 화면을 확인할 수 있습니다.

![페이지 예시 이미지](https://static.tosspayments.com/docs/brandpay/widget-1.png)

## 인증

클라이언트 코드의 `clientKey`, 서버 코드의 `SECRET_KEY`를 **내 상점의 테스트용 API 키**로 변경하세요. 테스트용 API 키는 [개발 정보 페이지](https://onboarding.tosspayments.com/my/integration)에서 확인할 수 있습니다.

API 키에 대한 더 자세한 내용은 [API 사용하기](/guides/apis/usage#가맹점용-api-키-발급받기) 페이지를 참고하세요.
