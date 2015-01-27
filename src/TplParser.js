
/**
 * @file 替换模板中的变量
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var etpl = require('etpl');

etpl.config({
    commandOpen: '<%',
    commandClose: '%>'
});

function TplParser () {
    
}

TplParser.prototype = {
    compile: function (source, data) {
        var template = etpl.compile(source);
        return template(data);
    }
};
var tplParser = new TplParser();
module.exports = exports = tplParser;
