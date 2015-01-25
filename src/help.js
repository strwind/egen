
/**
 * @file 帮助文件
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */

var pkg = require('../package.json');

var help = {
    defaultInfo: function () {
        var content = [
            '',
            '说明：中括号包括起来的为参数，括号中以等号结尾的为可选参数',
            '      参数在命令行中输入时，有字母大写时需要用引号包起来',
            '      [模块名]、[控件名]、[父类名]为自定义,[任务名]为form、list、detail中的一项',
            '',
            'Builtin Commands:',
            '    mod [模块名]  --生成模块所有所需文件',
            '       addjs     [模块名] [任务名]    --生成模块所需的js文件',
            '       addcss    [模块名]             --生成模块所需的less文件',
            '       addhtml   [模块名] [任务名]    --生成模块所需的tpl文件',
            '       addconfig [模块名]             --生成模块所需的config文件',
            '    ui [控件名] [父类名=]  --生成控件所有所需文件',
            '       addjs     [控件名] [父类名=]   --生成控件所需的js文件',
            '       addcss    [控件名] [父类名=]   --生成控件所需的less文件',
            '       addhtml   [控件名] [父类名=]   --生成控件所需的tpl文件',
            '       adddemo   [控件名] [父类名=]   --生成控件所需的demo文件',
            '',
            '举例：',
            '    生成一个名字为demo的模块：  egen mod demo',
            '    单独添加一个form类的文件：  egen mod addjs demo form',
            '    生成一个名字为Hello的控件： egen ui \'Hello\'',
            '    Hello单独添加一个demo文件： egen ui adddemo \'Hello\''
        ];
        console.log(content.join('\n'));
    },
    
    dumpVersion: function () {
        var vInfo = 'version--' + pkg.version;
        console.log(vInfo);
    }
};

module.exports = exports = help;