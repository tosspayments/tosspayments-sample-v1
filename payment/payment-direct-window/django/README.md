# payment-direct-window/django

Django를 이용한 카드사 결제창 샘플입니다.

## 준비하기

[Python](https://www.python.org/downloads/), [Django](https://www.djangoproject.com/download/), [pip](https://pip.pypa.io/en/stable/installation/)를 설치하세요.

## 실행하기

1. `/payments` 앱과 아래 설명을 참조해서 기존 프로젝트에 샘플 코드를 추가하세요.
2. 개발할 때는 `DJANGO_DEBUG=true python manage.py runserver` 로 실행하세요. DEBUG 가 꺼져 있으면 runserver 가 정적 파일(CSS)을 내려 주지 않아요.

## 기본 설명

패키지 종속성 관리를 위해 requirements.txt 를 활용 했어요.

기존에 운영하시던 프로젝트에 적용하실때 참조하실 수 있도록,

- 프로젝트 메인페이지는 분리된 app 인 main_page 에
- 결제 샘플은 분리된 app 인 payments 에 위치 시켰어요.
- 프로젝트 settings.py, urls.py 에서 app 설정을 확인 해주세요.

결제 샘플 `app/payments`를 참조해서, 프로젝트 앱에 templates/payments, urls.py, views.py 를 붙여넣기 해주세요.
