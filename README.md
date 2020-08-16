## Upgrade Radio Demo App to React Navigation 5

#### INTRODUCTION
DEMO模仿自日本广播APP，升级到React Navigation 5。

#### Run on iOS simulator

- Run `expo start` and press i from the command line.

- Run on iOS simulator from the browser-based DevTools UI

#### NOTE

Warning `Calling getNode() on the ref of an Animated component is no longer necessary`

To quick fix it, go to `node_modules/react-native-scrollable-tab-view/index.js`, find `this.scrollView.getNode()` (there are three fo them)  and modify to this:

`this.scrollView.scrollTo`

then save it. 


#### SCREENSHOTS

![simulator_1](https://user-images.githubusercontent.com/28306165/71025886-fa5a4700-2142-11ea-97d0-11dead4d1465.gif)


![simulator_2](https://user-images.githubusercontent.com/28306165/71025892-ff1efb00-2142-11ea-9e06-bfc1cdd161b2.gif)


![simulator_3](https://user-images.githubusercontent.com/28306165/71025898-0219eb80-2143-11ea-84fd-130c9f75f6ea.gif)


![simulator_6](https://user-images.githubusercontent.com/28306165/71025908-08a86300-2143-11ea-800d-5f3c31f545a7.gif)
