---
title: 如何保证同域名下的router后退操作（better fallback of back button ）
date: '2021-06-26'
summary: 如何使用`history.goBack()`并保持页面在相同域名下
---

在做自己的 Side Project 需要每个页面添加类似于 native app 的后退按钮，返回到之前已访问的页面。

![nav](/blog-images/nav.png)

因为使用了 `react-router`，自然的想法是使用`history.goBack()`。

```javascript
import { useHistory } from 'react-router-dom';

const App = () => {
  const history = useHistoy();

  return (
    <button onClick={() => history.goBack()}
  )
}
```

Easy！但是在浏览器中这样的问题是：如果用户是从别的页面（比如 google.com）通过链接点击或者地址栏输入我们的页面地址的，此时当点击后退按钮，用户会回到 google.com，这显然不是一个 SPA 多期望的。我们希望用户始终处于我们的 web app 中。

[Stackoverflow](https://stackoverflow.com/questions/34720626/how-to-ensure-that-router-goback-wont-navigate-outside-of-my-app-domain)上的答案并不能解决这一问题，直到我找到这个[issue](https://github.com/ReactTraining/history/issues/582#issuecomment-379271092)。我们可以通过判断 `location` 的 `key` 是否有值来判断当前页面是否是我们 app 的初始页面。

```javascript
import { useHistory, useLocation } from 'react-router-dom';

const App = () => {
  const history = useHistory();
  const location = useLocation();

  // go back to the previous page
  // fallback to home page if we are on the initial page
  const goBack = () => (location.key ? history.goBack() : history.push('/'));

  return (
    <button onClick={() => history.goBack()}
  )
}
```
