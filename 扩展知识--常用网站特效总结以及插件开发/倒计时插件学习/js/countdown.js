/**
 * Author: Merlin
 * Date: 2012-9-8
 * Time: PM 6:20
 * contact：QQ 77642304
 */

/*
 * 本插件 支持 1个或多个倒计时
 * startTime    介绍：毫秒数（多少毫秒后倒计时开始）（格式：1347206408）或者日期格式时间（格式1：2012-9-07 01:01:01）（格式2：2012/9/07 01:01:01）
 * endTime      介绍：毫秒数（多少毫秒后倒计时结束）（格式：1347206408）或者日期格式时间（格式1：2012-9-07 01:01:01）（格式2：2012/9/07 01:01:01）
 * nowTime      介绍：获取服务器当前刷新的时间或者本地电脑的时间
 * interval     介绍：单位：毫秒，取值范围（>=100毫秒），默认值为1000毫秒，倒计时刷新间隔（单位为毫秒/次）即每隔多少毫秒刷新一次，例如：interval = 2000, 那么屏幕上的时间每次变化时会少两秒
 * minDigit     介绍：每个时间单位值显示的最小位数，意思是超过不截断，少则前面补0显示，参数为：true 或 false  默认 true
 * showDay      介绍：是否显示天数，参数为：true 或 false 默认 true
 * timeUnitCls  介绍：时间单位的组合值,每个时间单位的class名自定义，设定时间单位b标签的class
 *              例如: {
                     'd': 'm-d', //天
                     'h': 'm-h', //小时
                     'm': 'm-m', //分
                     's': 'm-s', //秒
                 }
 * startTips    介绍：未开始时候的提示语，可以不填
 * endTips      介绍：倒计时中的提示语，可以不填
 * stopTips     介绍：结束后的提示语，默认 0天0时0分0秒 or 0时0分0秒
 * timeStamp    介绍：是否显示 天、时、分、秒 这几个字
 * */

// 倒计时插件

!function ($) {
    $.fn.countDown = function (options) {
        // 设置默认属性
        var settings = {
                "startTime":0,
                "endTime":this.attr('data-end') || 0,
                "nowTime":0,
                "interval":1000,
                "minDigit":true,
                "showDay":true,
                "timeUnitCls":{
                    "day":'m-d',
                    "hour":'m-h',
                    "min":'m-m',
                    "sec":'m-s'
                },
                "startTips":'',
                "endTips":'',
                "stopTips":'',
                "timeStamp":true
            },
            opts = $.extend({}, settings, options);

        return this.each(function () {
            var $timer = null,
                $this = $(this),
                $block = $('<span></span>'),
                nowTime,
            // 匹配时间
                startTime = isNaN(opts.startTime) ? (Date.parse(opts.startTime.replace(/-/g, '/')) / 1000) : Math.round(opts.startTime),
                endTime = isNaN(opts.endTime) ? (Date.parse(opts.endTime.replace(/-/g, '/')) / 1000) : Math.round(opts.endTime);

            // 判断当前时间
            nowTime = opts.nowTime === 0 ? Math.round(new Date().getTime() / 1000) : Math.round(opts.nowTime);

            // 补零方法
            function addZero(isAdd, time) {
                if (!isAdd) return time;
                else return time < 10 ? time = '0' + time : time;
            }

            // 天、时、分、秒
            var timeStamp = {"day":'', "hour":'', "min":'', "sec":''};
            if (opts.timeStamp) timeStamp = {"day":'天', "hour":'时', "min":'分', "sec":'秒'};

            (function remainTime() {
                var time = {},
                    seconds,
                    word = '';

                // 获取需要计时的毫秒数
                seconds = nowTime < startTime ? startTime - nowTime : endTime - nowTime;
                $this.html('');

                // 是否显示天数
                if (opts.showDay) {
                    time.day = addZero(opts.minDigit, Math.floor(seconds / 3600 / 24));
                    time.hour = addZero(opts.minDigit, Math.floor(seconds / 3600 % 24));
                } else {
                    time.hour = addZero(opts.minDigit, Math.floor(seconds / 3600));
                }
                time.min = addZero(opts.minDigit, Math.floor(seconds / 60 % 60));
                time.sec = addZero(opts.minDigit, Math.floor(seconds % 60));

                // 活动开始倒计时
                if (nowTime < startTime) {
                    if (opts.startTips) word = opts.startTips;
                } else {
                    // 活动结束倒计时
                    if (endTime > nowTime) {
                        if (opts.endTips) word = opts.endTips;
                    }// 倒计时停止
                    else {
                        if (opts.stopTips) {
                            word = opts.stopTips;
                            $this.html(word);
                        } else {

                            for (var i in time) {
                                if (i == 'day' && !opts.showDay) continue;
                                time[i] = 0;  // 时间置0
                                $block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
                            }
                        }
                        clearTimeout($timer);
                        return false;
                    }
                }

                // 写入
                $this.html(word);
                for (var i in time) {
                    if (i == 'day' && !opts.showDay) continue;
                    $block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
                }

                // 累加时间
                nowTime = nowTime + opts.interval / 1000;

                // 循环调用
                $timer = setTimeout(function () {
                    remainTime();
                }, opts.interval);
            })();
        });
    }
}(jQuery);

/**
 * Author: Merlin
 * Date: 2012-9-8
 * Time: PM 6:20
 * contact：QQ 77642304
 */

/*
 * 默认关闭的是调用的对象本身
 * time   介绍：倒计时时间
 * tag    介绍：存放倒计时时间的容器
 * closed 介绍：关闭的方法，现在有两种：hide or remove or refresh
 *             hide 窗体隐藏，remove将 窗体删除，refresh 刷新页面 或者 配合 url 进行页面跳转
 * url    介绍：跳转地址
 * */

// 倒计时关闭
!function ($) {
    $.fn.timing = function (options) {
        // 设置倒计时默认属性
        var settings = {
                "time":3,
                "tag":'',
                "closed":'hide',
                "url":''
            },
            opts = $.extend({}, settings, options),
            $timer = null,
            $this = $(this);

        if (opts.tag != '') {
            var $tag = $this.find(opts.tag);
            $tag.text(opts.time);
        }

        $timer = setInterval(function () {
            if (opts.time > 1) {
                if (opts.tag != '') {
                    $tag.text(--opts.time);
                } else {
                    --opts.time;
                }
            } else {
                clearInterval($timer);
                switch (opts.closed) {
                    case "hide" : {
                        $this.hide();
                    }
                        break;
                    case "remove" : {
                        $this.remove();
                    }
                        break;
                    case "refresh" : {
                        window.location.href = opts.url ? opts.url : window.location.href;
                    }
                        break;
                }
            }
        }, 1000);
    }
}(jQuery);