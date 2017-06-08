### [点我预览](https://wanghairong-i.github.io/HrCountdown/)

# HrCountdown 精确到毫秒的倒计时js插件


## 如何使用

```javascript
HrCountdown({
   date : "2017-8-3 18:57:11", 
   box : $("#timeBox"),
   end : function(_this){ } //倒计时结束后的回调,传进来的实参是实例的this指针
});
```

或者
```javascript
HrCountdown({
   date : 1454567000123, 
   box : $("#timeBox"),
   end : function(_this){ } //倒计时结束后的回调,传进来的实参是实例的this指针
});
```
