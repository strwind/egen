
/**
 * @file 常用操作util
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */

var util = {
    /*
     * 扩展对象
     * @param {Object} ObjA
     * @param {Object} ObjB
     * @param {boolean=} force ObjB是否强行覆盖ObjA
     * @return {Object} ObjA
     */
    extend: function (objA, objB, force) {
        for(var key in objB) {
            if (!objA.hasOwnProperty(key) || force) {
                objB[key] && (objA[key] = objB[key]);
            }
        }
        return objA;
    },
    
    /*
     * 让字符串首字母大写
     * @param {string} str
     * @return {string}
     */
    toUpperCase: function (str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    },
    
    /*
     * 让字符串首字母小写
     * @param {string} str
     * @return {string}
     */
    toLowerCase: function (str) {
        return str.slice(0, 1).toLowerCase() + str.slice(1);
    },
    
    /*
     * 过滤掉数组尾部的空项
     * @param {Array} arr
     * @return {Array}
     */
    trimArrayEnd: function (arr) {
        var len = arr.length;
        for (var i = len - 1; i > -1; i--) {
            if (!arr[i] && arr[i] !== 0) {
                arr.splice(i, 1);
            }
            else {
                return arr;
            }
        }
    },
    
    /*
     * 获取格式化后的日期  比如2014-11-03 
     * @param {Date=} date 日期对象 
     * @return {string}
     */
    getFormatDate: function (date) {
        date = date || new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        month = parseInt(month, 10) + 1;
        var day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    },
    
    /*
     * 去除引号
     * @param {string} str 
     * @return {string} str
     */
    clearQuotes: function (str) {
        if (!str) {
            return str;
        }
        var re = /[''""]/g;
        return str.replace(re, '');
    }
    
};
module.exports = exports = util;