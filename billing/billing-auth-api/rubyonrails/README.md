# Ruby on Rails Project

## 기본설명
```
Ruby on Rails 환경을 먼저 준비 해주세요.

패키지 종속성 관리를 위해 Gemfile 을 활용 했어요.
* HTTParty 를 추가 했어요.

기존에 운영하시던 프로젝트에 적용하실때 참조하실 수 있도록,
* 결제 샘플은 분리된 app 인 billing 을 추가 하였어요.
** app/controllers 에 추가된 app 이름으로 생성된 {{project_name}}_controller.rb
** app/views 내 HTML 템플릿
** config/routes.rb 에 설정된 route 를 확인 해주세요. 

샘플에는 CSS 를 적용해두었어요. 
* asset/stylesheet 에 css 파일 추가
* config/initializers/asset.rb 에 precompile 부분 아래 내용 추가
** Rails.application.config.assets.precompile += %w( bulma.min.css )
```