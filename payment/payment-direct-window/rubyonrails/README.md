# payment-direct-window/rubyonrails

Ruby on Rails를 이용한 카드사 결제창 샘플입니다.

## 준비하기

Ruby on Rails 환경을 먼저 준비해주세요.

## 실행하기

1. `/app` 폴더와 아래 기본 설명을 참조해서 기존 프로젝트에 샘플 코드를 추가하세요.

## 기본 설명

Gemfile로 패키지 종속성을 관리해요.

- HTTParty 를 추가 했어요.

결제 샘플은 분리된 payments app에 있어요.

- app/controllers 에 추가된 app 이름으로 생성된 {{project_name}}\_controller.rb
- app/views 내 HTML 템플릿
- config/routes.rb 에 설정된 route 를 확인 해주세요.
