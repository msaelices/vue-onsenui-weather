# vue-onsenui-weather

> Vue OnsenUI Weather App

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn start

# build for production with minification
yarn build

# execute linter
yarn lint
```

## Run on Android

Install JDK 1.8

Install Android SDK from https://developer.android.com/studio/index.html

Choose some directory in your home, like `$HOME/Android/Sdk`

Plug Android device using USB, enabling USB debugging previously. See https://developer.android.com/studio/debug/dev-options.html

``` bash
cordova platform add android
yarn build
cordova run android
```
