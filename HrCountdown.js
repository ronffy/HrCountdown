/** 
 ** HrCountdown 精确到毫秒的倒计时js插件  
 ** By hairong.W 
 ** 2016-5-4 
 **/
(function($){
	/*@param [必选] obj 2个属性：
        date ：结束的时间，支持合法的日期格式和时间戳
        box : 计时容器元素*/
	function HrCountdown(obj){
		this.getObj = {
			date : obj.date,
			box : $(obj.box),
			end : obj.end || null
		};
		var box = this.getObj.box;
		this.elChild = {
			hm : box.find(".countdown-hm"),
			sec : box.find(".countdown-sec"),
			mini : box.find(".countdown-mini"),
			hour : box.find(".countdown-hour"),
			day : box.find(".countdown-day"),
			month : box.find(".countdown-month"),
			year : box.find(".countdown-year")
		};
		var elChild = this.elChild;
		this.elLength = {
			hm : elChild.hm.length,
			sec : elChild.sec.length,
			mini : elChild.mini.length,
			hour : elChild.hour.length,
			day : elChild.day.length,
			month : elChild.month.length,
			year : elChild.year.length
		};
		this.setDom();
	}

	// 为小于9的分钟、小时、秒、天添加"0"前缀
	HrCountdown.prototype.addZero = function(n){
		var n = parseInt(n, 10);//解析字符串,返回整数
		if(n > 0){
			if(n <= 9)n = "0" + n;
			return String(n);
		}
		return "00";
	};

	// 给毫秒数添加"0"前缀
	HrCountdown.prototype.setHaomiao = function(n){
		if(n < 10)return "00" + n.toString();
		if(n < 100)return "0" + n.toString();
		return n.toString();
	};

	// 对时间小数做向下取整：
	HrCountdown.prototype.floorTime = function(obj){
		if(obj.timeFull){ //非年的处理
			obj.goal[obj.type] = Math.floor(obj.dur / obj.timeScale) > 0 ? this.addZero(Math.floor(obj.dur / obj.timeScale) % obj.timeFull) : "00";
		}else{ //年份无需前缀加"0"
			obj.goal[obj.type] = Math.floor(obj.dur / obj.timeScale) > 0 ? Math.floor(obj.dur / obj.timeScale) : "00";
		}
	};

	// (有返回值) 根据传入的结束时间跟当前时间对比，返回当前距离结束的时间对象：
	HrCountdown.prototype.setTime = function(){
		var _this = this,
			_this_getobj = _this.getObj,
			now = new Date(),
			now_time = now.getTime(),
			this_time = (new Date(_this_getobj.date)).getTime(),
			dur = (this_time - now_time) / 1000 , 
			mss = this_time - now_time ,
			pms = {},//属性为各时间类型的对象
			elLength = this.elLength;
		if(mss > 40){
			elLength.hm ? pms.hm = _this.setHaomiao(mss % 1000) : pms.hm = null;
			elLength.sec ? (pms.sec = _this.addZero(dur % 60)) : pms.sec = null;
			elLength.mini ? _this.floorTime({ dur:dur, goal:pms, type : "mini", timeScale : 60, timeFull : 60}) : pms.mini = null;
			elLength.hour ? _this.floorTime({ dur:dur, goal:pms, type : "hour", timeScale : 3600, timeFull : 24}) : pms.hour = null;
			elLength.day ? _this.floorTime({ dur:dur, goal:pms, type : "day", timeScale : 86400, timeFull : 30}) : pms.day = null;
			//月份，以实际平均每月秒数计算
			elLength.month ? _this.floorTime({ dur:dur, goal:pms, type : "month", timeScale : 2629744, timeFull : 12}) : pms.month = null;
			//年份，按按回归年365天5时48分46秒算
			elLength.year ? _this.floorTime({ dur:dur, goal:pms, type : "year", timeScale : 31556926}) : pms.year = null;
		}else if(mss > 0){
			pms.year=pms.month=pms.day=pms.hour=pms.mini=pms.sec="00";
			pms.hm = "000";
		}else{
			// console.log('结束了');
			_this_getobj.end && _this_getobj.end(_this);
			return;
		}
		return pms;
	};

	// 根据setTime方法返回的时间对象，渲染在页面上：
	HrCountdown.prototype.setDom = function(){
		var _this = this,
			pms = _this.setTime(),
			elChild = this.elChild;
		if(pms){
			console.log(1);
			pms.hm && elChild.hm.html(pms.hm);
			pms.sec && elChild.sec.html(pms.sec);
			pms.mini && elChild.mini.html(pms.mini);
			pms.hour && elChild.hour.html(pms.hour);
			pms.day && elChild.day.html(pms.day);
			pms.month && elChild.month.html(pms.month);
			pms.year && elChild.year.html(pms.year);
			setTimeout(_this.setDom.bind(_this), pms.hm ? 10 : 500); //如果需要精确到毫秒，则10毫秒渲染一次dom，反之则500毫秒渲染一次dom
		}
	};

	window.HrCountdown = function(obj){
		new HrCountdown(obj);
	};
})(jQuery);

// 使用demo---/s
// HrCountdown({
// 	date : 1454567000123, 
// 	box : $("#timeBox"),
//  end : function(_this){ } //倒计时结束后的回调,传进来的实参是实例的this指针
// });
// HrCountdown({
// 	date : "2017-8-3 18:57:11", 
// 	box : $("#timeBox")
// });
// 使用demo---/e
