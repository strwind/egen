
/**
 * @file 替换模板中的变量
 * @author yaofeifei(yaofeifei@baidu.com)
 * @date 2014-10-30
 */
var etpl = require('etpl');

etpl.config({
    commandOpen: '<%',
    commandClose: '%>'
});
/**
 * 模板解析接口类
 * @param {Object} options 初始化参数
 * @constructor 
 */
function TplParser (options) {
    this.options = options;
}

TplParser.prototype = {
    /**
     * 解析模板
     * @param {string} source 模板字符串
     * @param {Object} data 替换的数据对象
     * @public
     */
    compile: function (source, data) {
        var template = etpl.compile(source);
        return template(data);
    }
};
var tplParser = new TplParser();
module.exports = exports = tplParser;
