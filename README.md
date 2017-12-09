# vue-onsenui-weather

> Vue OnsenUI Weather App

## Some features

* Add/remove user's locations, storing them on localStorage.
* Retrieve locations forecasts, using openweathermap.org API, with pull-to-refresh control.
* SVG animations for weather icons.
* Autocompletion using Google geocoding API.
* Side menu.
* Use Vuex for state management.

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

# build and deploy app into gh-pages
yarn deploy
```

## Online version

As hybrid apps are essentially web apps, you can view the gh-pages version here:

https://msaelices.github.io/vue-onsenui-weather/#/

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

## Roadmap

* Settings page, to allow users change metrics, preferred city and other stuff.
* Improve SVG animations performance.
* App icon showing current weather in the first location.
* Drag-and-drop cities to change ordering.
* Show city photos in the forecast detail page, using Google Place API.

If you have more feature ideas or you want to report issues, please add them on https://github.com/msaelices/vue-onsenui-weather/issues


## Notes

Based on this [react version](https://github.com/argelius/react-onsenui-redux-weather), but with more features and built using Vue and Vuex, instead of React and Redux.