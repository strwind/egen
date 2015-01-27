
/**
 * @file 帮助文件
 * @author yaofeifei(yaofeifei@baidu.com)
 * @date 2014-10-30
 */

var pkg = require('../package.json');

var help = {
    defaultInfo: function () {
        var content = [
            '',
            'egen -- Easy generator',
            '',
            '使用仅需三步：',
            '    1、项目根目录下创建egenConfig文件夹',
            '    2、egenConfig中配置config.js文件和所需模板文件',
            '    3、根目录下运行egen xxx',
            '',
            '详情可参考：https://github.com/strwind/egen/tree/master/demo/helloword'
        ];
        console.log(content.join('\n'));
    },
    dumpVersion: function () {
        var vInfo = 'version--' + pkg.version;
        console.log(vInfo);
    }
};

module.exports = exports = help;
