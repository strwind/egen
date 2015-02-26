
/**
 * @file 模块信息配置
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var path = require('path');
var cwd = process.cwd();
var join = path.join;
var tplPath = join(cwd, 'egenConfig/tpl');

var config = {
    /**
     * 命令变量映射（可选）
     * args1 代表egen命令后的第一个参数，args2代表第二个，以此类推 
     * Args1 代表第一个参数的第一个字母大写转化， 以此类推
     * ARGS1 代表第一个参数的全部字母大写转化， 以此类推
     */
    'commandMap': {
        '${moduleName}': 'args1',
        '${ModuleName}': 'Args1',
        '${MODULENAME}': 'ARGS1'
    },
    
    /**
     * 模板变量替换字典（可选）
     */
    'commonTplData': {
        'userName': 'yaofeifei',
        'email': 'yaofeifei@baidu.com',
        'createDate': true,
        'moduleName': '${moduleName}',
        'ModuleName': '${ModuleName}',
        'MODULENAME': '${MODULENAME}',
        'customVar': '${moduleName}—${ModuleName}—${MODULENAME}~随意组合下%（）&&*（%￥…￥%'
    },
    
    /**
     * 生成任务list
     * 每个有type属性的对象， key名即文件名
     * @type {string} path： 文件路径
     * @type {string} type：文件类型
     * @type {string=} subCommand：子命令
     * @type {string} tplForm: 模板路径
     * @type {Object=} fileReference: 文件引用信息
     * @type {string=} fileReference.path： 文件引用路径
     * @type {string=} fileReference.content： 文件引用的内容
     * @type {number=} fileReference.line： 文件引用的行号
     * @type {Object=} tplData：私有模板配置字典数据
     * @type {Function=} callback: 回调函数，这里只配置函数的位置，具体的函数放在handlers中
     */
    'taskList': [
        //资源文件夹配置
        {
            'path': join(cwd, 'assets'),
            'type': 'folder',
            // css文件夹配置
            'css': {
                'type': 'folder',
                'subCommand': 'addcss',
                '${moduleName}.css': {
                    'type': 'file',
                    'tplFrom': join(tplPath, 'css.css'),
                    'callback': 'config.handlers.cssDone'
                },
                'callback': 'config.handlers.cssFolderDone'
            },
            'callback': 'config.handlers.assetsFolderDone'
        },
        //依赖文件夹配置
        {
            'path': join(cwd, 'dep'),
            'type': 'folder',
            'callback': 'config.handlers.depFolderDone'
        },
        // html配置
        {
            'path': join(cwd, '${moduleName}.html'),
            'type': 'file',
            'subCommand': 'addhtml',
            'tplFrom': join(tplPath, 'tpl.html'),
            'tplData': {
                'cssPath': 'assets/css/${moduleName}.css'
            },
            'callback': 'config.handlers.htmlDone'
        }
    ],
    
    /**
     * 处理函数集合（可选）
     */
    'handlers': {
        // status=true为成功,status=false为失败
        'assetsFolderDone': function (status) {
            console.log('assets folder done!');
        },
        'depFolderDone': function (status) {
            console.log('dep folder done!');
        },
        'cssFolderDone': function (status) {
            console.log('css folder done!');
        },
        'htmlDone': function (status) {
            console.log('html file done!');
        },
        'cssDone': function (status) {
            console.log('css file done!');
        }
    }
};

module.exports = exports = config;
