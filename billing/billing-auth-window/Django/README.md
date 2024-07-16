# Python - Django Project

## 기본설명
```
Python - Django 환경을 먼저 준비 해주세요.

패키지 종속성 관리를 위해 requirements.txt 를 활용 했어요.

기존에 운영하시던 프로젝트에 적용하실때 참조하실 수 있도록,
* 프로젝트 메인페이지는 분리된 app 인 main_page 에
* 결제 샘플은 분리된 app 인 billing 에 위치 시켰어요.
** 프로젝트 settings.py, urls.py 에서 app 설정을 확인 해주세요.

결제 샘플 app 인 billing 를 참조해서, 
프로젝트에서 원하시는 이름의 app을 추가하신 이후에 templates/billing, urls.py, views.py 를 붙여넣기 해주세요. 

샘플에는 CSS 를 적용해두었어요. 
* static/billing 내에 CSS 폴더/파일을 추가 하였어요. 
* html 내에 아래와 같이 CSS 추가 적용 하였어요.
** {% load static %}
** <link rel="stylesheet" type="text/css" href="{% static 'billing/bulma/bulma.min.css' %}"/>
```