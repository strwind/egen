
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
     * 命令变量映射
     * args1 代表egen命令后的第一个参数 ,args2代表第二个，以此类推 
     * Args1 代表第一个参数的第一个字母大写转化， 以此类推
     */
    'commandMap': {
        '${moduleName}': 'args1',
        '${ModuleName}': 'Args1'
    },
    /**
     * 模板变量替换字典 
     */
    'commonTplData': {
        'userName': 'yaofeifei',
        'email': 'yaofeifei@baidu.com',
        'createDate': true,
        'modName': '${moduleName}',
        'modNameCapitalize': '${ModuleName}'
    },
    
    /*
     * 生成任务list
     * targetPath 生成模块代码的路径
     * tplPath 模块的模板所在路径
     * hasMockup 是否生成mock文件
     * hasCssRef 是否需要添加css引用路径
     * hasConfigRef 是否需要添加config引用路径
     * cssRefTargetPath 模块的css文件需要添加引用的路径
     * configRefTargetPath 模块的config文件需要添加的引用路径
     */
    'taskList': [
        //模块文件夹配置
        {
            'path': join(cwd, 'src/${moduleName}'),
            'type': 'folder',
            // css文件夹配置
            'css': {
                'type': 'folder',
                '${moduleName}.less': {
                    'type': 'file',
                    'tplFrom': join(tplPath, 'action.less'),
                    'addRefTarget': {
                        'path': join(cwd, 'src/pathRef/main.less'),
                        'content': '@import \'../biz/${moduleName}/css/${moduleName}.less\';',
                        'line': -1
                    },
                    'callback': 'config.handlers.cssSuccess'
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
                'addRefTarget': {
                    'path': join(cwd, 'src/pathRef/moduleConfig.js'),
                    'content': '    require(\'biz/${moduleName}/config\');',
                    'line': -2
                },
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
            }
        },
        
        //mock文件配置
        {
            'path': join(cwd, 'mockup/${moduleName}'),
            'type': 'folder',
            // list页面mock数据
            'list.json': {
                'type': 'file',
                'tplFrom': join(tplPath, 'list.json')
             }
        }
    ],
    
    'handlers': {
        'cssSuccess': function (status) {
            if (status) {
                console.log('good job!');
            }
        }
    }
};

module.exports = exports = config;
