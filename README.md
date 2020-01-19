# serverless-s3-trigger-nodejs

## 환경설정 file

* env/.env_{stag}.json에 file을 생성
  * ex) env/.env_dev.json -> default로 .env_dev.json을 설정 file로 사용한다.

* env/.env_{stag}.json에 file에 아래와 같이 작성

```json
{
    "UPLOAD_BUCKET_NAME": "upload된 file이 저장될 bucekt",
    "DESTINATION_BUCKET_NAME": "resize한 file을 저장할 bucket",
    "API_BASE_URI": "api server base uri"
}
```

## 사용법

```bash
# test
yarn test

# 배포
yarn deploy

# serverless yml config 확인
serverless print

# test image upload
aws s3 cp test/test.jpg s3://{bucket name}/uploads/test.jpg
```
