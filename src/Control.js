
/**
 * @file 生成Control 控件
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var path = require('path');
var cfgMgr = require('./configManager');
var ctrCfg = cfgMgr.control;
var FileOperator = require('./FileOperator');
var fileOpr = new FileOperator();
var PathRef = require('./PathRef');
var pathRef = new PathRef();

/*
 * @constructor
 * @param {string} ctrName 控件名称
 * @param {string=} ctrSupName 控件父类名称
 */
function Control(ctrName, ctrSupName) {
    this.targetPath = ctrCfg.targetPath;
    this.tplPath = ctrCfg.tplPath;
    this.demoPath = ctrCfg.demoPath;
    this.cssRefTargetPath = ctrCfg.cssRefTargetPath;
    this.demoRefTargetPath = ctrCfg.demoRefTargetPath;
    this.ctrCssPath = path.join(this.targetPath, '/css');
    this.ctrHtmlPath = path.join(this.targetPath, '/tpl');
    this.task = cfgMgr.getCtrTask(ctrName, ctrSupName);
}

Control.prototype = {
    /*
     * 初始入口
     * @public
     */
    init: function () {
        var me = this;
        me.addJs();
        me.addHtml();
        me.addCss(function () {
           ctrCfg.hasCssRef && me.addCssRef();
        });
        ctrCfg.hasDemo && me.addDemo(function () {
            ctrCfg.hasDemoRef && me.addDemoRef();
        });
    },
    
    /*
     * 创建一个js文件 
     * @param {Function=} callback 回调函数
     * @public
     */
    addJs: function (callback) {
        fileOpr.insureDir(this.targetPath);
        var filename = this.task.className + '.js';
        var tplname = 'control.js';
        var fileLocation = path.join(this.targetPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(fileLocation, tplLocation, callback);
    },
    
     /*
     * 创建一个css文件 
     * @param {Function=} callback 回调函数
     * @public
     */
    addCss: function (callback) {
        fileOpr.insureDir(this.targetPath);
        fileOpr.insureDir(this.ctrCssPath);
        var filename = this.task.cssFileName + '.less';
        var tplname = 'control.less';
        var fileLocation = path.join(this.ctrCssPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个html文件 
     * @param {Function=} callback 回调函数
     * @public
     */
    addHtml: function (callback) {
        fileOpr.insureDir(this.targetPath);
        fileOpr.insureDir(this.ctrHtmlPath);
        var filename = this.task.className + '.html';
        var tplname = 'control.html';
        var fileLocation = path.join(this.ctrHtmlPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个DEMO文件 
     * @param {Function=} callback 回调函数
     * @public
     */
    addDemo: function (callback) {
        fileOpr.insureDir(this.demoPath);
        var filename = this.task.demoFileName + '.html';
        var tplname = 'ui.control.html';
        var fileLocation = path.join(this.demoPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个文件 
     * @param {string} fileLocation 文件名称
     * @param {string} tplLocation 模板名称
     * @param {string=} type 文件类型
     * @public
     */
    genFile: function (fileLocation, tplLocation, callback) {
        var parseData = this.task;
        fileOpr.createFile(fileLocation, tplLocation, parseData, function (err) {
            if (err) {
                throw err;
            }
            callback && callback();
        });
    },
    
    /*
     * 添加css的引用
     * @public
     */
    addCssRef: function () {
        var target = this.cssRefTargetPath;
        var content = '@import \'./' + this.task.cssFileName + '.less\';';
        var line = -1;
        pathRef.addRef(target, content, line);
    },
    /*
     * 添加demo的引用
     * @public
     */
    addDemoRef: function () {
        var target = this.demoRefTargetPath;
        var content = [
            '            {',
            '                id: ' + Date.now() + ',',
            '                text: ' + '\'' + this.task.demoFileName + '\'',
            '            },'
        ];
        content = content.join('\n');
        var line = 329;
        pathRef.addRef(target, content, line);
    }
};

module.exports = exports = Control;
