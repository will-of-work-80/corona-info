# Corona info site

## Development environment
Node.js 18.13.0
Homebrew 4.0.6
git 2.32.0

## Document
-   コロナ関連情報は以下のサイトから取得している
    -   https://corona.go.jp/dashboard/

-   全国のコロナ感染者数(都道府県別)
    -   https://opendata.corona.go.jp/api/Covid19JapanAll?date=yyyymmdd
        -   データ取得例

            {"errorInfo":{"errorFlag":"0","errorCode":null,"errorMessage":null},"itemList":[{"date":"2023-03-28","name_jp":"北海道","npatients":"1339531"},{"date":"2023-03-28","name_jp":"青森県","npatients":"279425"},{"date":"2023-03-28","name_jp":"岩手県","npatients":"234563"},{"date":"2023-03-28","name_jp":"宮城県","npatients":"537246"}...

            {"errorInfo":{"errorFlag":"0","errorCode":null,"errorMessage":null},"itemList":[]}
        -   データ取得失敗の時

## How to deploy

```sh
$ npm install
```

## Getting Started

```sh
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
