
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
            'egen -- easy generator',
            '',
            '使用仅需三步：',
            '    1、项目根目录下创建egen-config.js文件',
            '    2、创建件egen模板文件夹（默认为egenTpl）及其模板文件',
            '    3、根目录下运行 $ egen xxx',
            '',
            '可以运行 --init 子命令，生成一个默认的配置',
            '',
            '详情可参考：https://github.com/strwind/egen/tree/master/demo/helloWorld'
        ];
        console.log(content.join('\n'));
    },
    dumpVersion: function () {
        var vInfo = 'version--' + pkg.version;
        console.log(vInfo);
    }
};

module.exports = exports = help;
