# CCP - Crypto Currency Portal

## 배포

firebase로 호스팅하며 gatsby로 빌드

1. gatsby

   ```
   $ gatsby build
   ```

   `public` 폴더로 번들됨

2. firebase

   firebase CLI 통해서 배포하며 public 폴더 안에서 있는 파일들을 업로드한다.

   ```
   $ firebase deploy
   ```

   `firebase.json` 설정 파일 안에 `hosting.public` 속성을 통해서 배포 폴더를 지정할 수 있다.

   현재는 `public` 폴더로 배포

**배포 스크립트 통합**

```
$ yarn deploy // gatsby build && firebase deploy
```
