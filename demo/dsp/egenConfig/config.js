
/**
 * @file 模块信息配置
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var path = require('path');
var cwd = process.cwd();
var join = path.join;
var tplPath = join(cwd, 'egenConfig/tpl/mod');

var config = {
    /**
     * 命令变量映射（可选）
     * args1 代表egen命令后的第一个参数 ,args2代表第二个，以此类推 
     * Args1 代表第一个参数的第一个字母大写转化， 以此类推
     */
    'commandMap': {
        '${moduleName}': 'args1',
        '${ModuleName}': 'Args1'
    },
    
    /**
     * 模板变量替换字典（可选）
     */
    'commonTplData': {
        'userName': 'yaofeifei',
        'email': 'yaofeifei@baidu.com',
        'createDate': true,
        'modName': '${moduleName}',
        'modNameCapitalize': '${ModuleName}'
    },
    
    /**
     * 生成任务list
     * 每个有type属性的对象， key名即文件名
     * @type {string} path： 文件路径
     * @type {string} type：文件类型
     * @type {string} subCommand：子命令
     * @type {string} tplForm: 模板路径
     * @type {Object} fileReference: 文件引用信息
     * @type {string} fileReference.path： 文件引用路径
     * @type {string} fileReference.content： 文件引用的内容
     * @type {string} fileReference.line： 文件引用的行号
     * @type {Object} tplData：私有模板配置数据
     * @type {Function} callback: 回调函数，这里只配置函数的位置，具体的函数放在handlers中
     */
    'taskList': [
        //模块文件夹配置
        {
            'path': join(cwd, 'src/${moduleName}'),
            'type': 'folder',
            'subCommand': 'addmod',
            // css文件夹配置
            'css': {
                'type': 'folder',
                'subCommand': 'addcss',
                '${moduleName}.less': {
                    'type': 'file',
                    'tplFrom': join(tplPath, 'action.less'),
                    'fileReference': {
                        'path': join(cwd, 'pathRef/main.less'),
                        'content': '@import \'../biz/${moduleName}/css/${moduleName}.less\';',
                        'line': -1
                    }
                }
            },
             // tpl文件夹配置
            'tpl': {
                'type': 'folder',
                'detail.tpl.html': {
                    'type': 'file',
                    'tplFrom': join(tplPath, 'detail.html'),
                    'tplData': {
                        'viewName': '${ModuleName}Detail'
                    }
                },
                'form.tpl.html': {
                    'type': 'file',
                    'tplFrom': join(tplPath, 'form.html'),
                    'tplData': {
                        'viewName': '${ModuleName}Form'
                    }
                },
                'list.tpl.html': {
                    'type': 'file',
                    'tplFrom': join(tplPath, 'list.html'),
                    'tplData': {
                        'viewName': '${ModuleName}List'
                    }
                }
            },
           // config配置
            'config.js': {
                'type': 'file',
                'tplFrom': join(tplPath, 'config.js'),
                'fileReference': {
                    'path': join(cwd, 'pathRef/moduleConfig.js'),
                    'content': '    require(\'biz/${moduleName}/config\');',
                    'line': -2
                }
            },
            // DetailAction配置
            '${ModuleName}Detail.js': {
                'type': 'file',
                'tplFrom': join(tplPath, 'detail.js'),
                'tplData': {
                    'actionName': '${ModuleName}Detail',
                    'viewName': '${ModuleName}Detail',
                    'tplFileName': 'detail'
                }
            },
            // FormAction配置
            '${ModuleName}Form.js': {
                'type': 'file',
                'tplFrom': join(tplPath, 'form.js'),
                'tplData': {
                    'actionName': '${ModuleName}Form',
                    'viewName': '${ModuleName}Form',
                    'tplFileName': 'form'
                }
            },
            // ListAction配置
            '${ModuleName}List.js': {
                'type': 'file',
                'tplFrom': join(tplPath, 'list.js'),
                'tplData': {
                    'actionName': '${ModuleName}List',
                    'viewName': '${ModuleName}List',
                    'tplFileName': 'list'
                }
            },
        },
        
        //mock文件配置
        {
            'path': join(cwd, 'mockup/${moduleName}'),
            'type': 'folder',
            // list页面mock数据
            'list.json': {
                'type': 'file',
                'tplFrom': join(tplPath, 'list.json')
             },
            'callback': 'config.handlers.success'
        }
    ],
    
    /**
     * 处理函数集合（可选）
     */
    'handlers': {
        'success': function (status) {
            if (status) {
                console.log('good job!');
            }
        }
    }
};

module.exports = exports = config;
