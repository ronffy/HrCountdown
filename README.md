预览：https://whrweb.github.io/HrCountdown/
# HrCountdown 精确到毫秒的倒计时js插件


// 使用demo---/s
<br/>
<code>
HrCountdown({
	date : "2017-8-3 18:57:11", 
	box : $("#timeBox"),
	end : function(_this){ } //倒计时结束后的回调,传进来的实参是实例的this指针
});
</code>
<br/>
或者
<br/>
<code>
HrCountdown({
	date : 1454567000123, 
	box : $("#timeBox"),
	end : function(_this){ } //倒计时结束后的回调,传进来的实参是实例的this指针
});
</code>
<br/>
// 使用demo---/e
