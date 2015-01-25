
/**
 * @file 生成action模块
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var path = require('path');
var cfgMgr = require('./configManager');
var modCfg = cfgMgr.module;
var FileOperator = require('./FileOperator');
var fileOpr = new FileOperator();
var PathRef = require('./PathRef');
var pathRef = new PathRef();

/*
 * @constructor
 * @param {string} modName 模块名称
 */
function Mod(modName) {
    this.modName = modName;
    this.targetPath = modCfg.targetPath;
    this.tplPath = modCfg.tplPath;
    this.mockupPath = modCfg.mockupPath;
    this.modPath = path.join(this.targetPath, modName);
    this.modCssPath = path.join(this.modPath, '/css');
    this.modHtmlPath = path.join(this.modPath, '/tpl');
    this.modMockupPath = path.join(this.mockupPath, modName);
    this.configRefTargetPath = modCfg.configRefTargetPath;
    this.cssRefTargetPath = modCfg.cssRefTargetPath;
    this.taskList = cfgMgr.defaultModTaskList;
    this.taskCollection = cfgMgr.getModTaskCollection(modName);
}

Mod.prototype = {
    /*
     * 初始入口
     * @public
     */
    init: function () {
        var me = this;
        me.taskList.forEach(function (taskName, index) {
            me.addJs(taskName);
            me.addHtml(taskName);
        });
        me.addConfig(function () {
            modCfg.hasConfigRef && me.addCfgRef();
        });
        me.addCss(function () {
            modCfg.hasCssRef && me.addCssRef();
        });
        modCfg.hasMockup && me.addMockup('list');
    },
    
    /*
     * 创建一个config文件
     * @param {Function=} callback 回调函数
     * @public
     */
    addConfig: function (callback) {
        fileOpr.insureDir(this.modPath);
        var filename = 'config.js';
        var tplname = 'config.js';
        var fileLocation = path.join(this.modPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile('config', fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个js文件 
     * @param {string} taskName 任务名
     * @param {Function=} callback 回调函数
     * @public
     */
    addJs: function (taskName, callback) {
        fileOpr.insureDir(this.modPath);
        var task = this.taskCollection[taskName];
        var filename = task.actionName + '.js';
        var tplname = taskName + '.js';
        var fileLocation = path.join(this.modPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(taskName, fileLocation, tplLocation, callback);
    },
    
     /*
     * 创建一个css文件 
     * @param {Function=} callback 回调函数
     * @public
     */
    addCss: function (callback) {
        fileOpr.insureDir(this.modPath);
        fileOpr.insureDir(this.modCssPath);
        var filename = this.modName + '.less';
        var tplname = 'action.less';
        var fileLocation = path.join(this.modCssPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile('css', fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个html文件 
     * @param {string} taskName 任务名
     * @param {Function=} callback 回调函数
     * @public
     */
    addHtml: function (taskName, callback) {
        fileOpr.insureDir(this.modPath);
        fileOpr.insureDir(this.modHtmlPath);
        var filename = taskName + '.tpl.html';
        var tplname = taskName + '.html';
        var fileLocation = path.join(this.modHtmlPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(taskName, fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个mockup文件 
     * @param {string} taskName 任务名
     * @param {Function=} callback 回调函数
     * @public
     */
    addMockup: function (taskName, callback) {
        fileOpr.insureDir(this.modMockupPath);
        var filename = 'list.json';
        var tplname = 'list.json';
        var fileLocation = path.join(this.modMockupPath, filename);
        var tplLocation = path.join(this.tplPath, tplname);
        this.genFile(taskName, fileLocation, tplLocation, callback);
    },
    
    /*
     * 创建一个任务的文件
     * @param {string} taskName 任务名
     * @param {Function=} callback 回调函数
     * @public
     */
    addTask: function (taskName, callback) {
        this.addJs(taskName);
        this.addHtml(taskName);
    },
    
    /*
     * 创建一个文件 
     * @param {string} filename 文件名称
     * @param {string} tplname 模板名称
     * @param {string=} type 文件类型
     * @public
     */
    genFile: function (taskName, fileLocation, tplLocation, callback) {
        var parseData = this.taskCollection[taskName];
        fileOpr.createFile(fileLocation, tplLocation, parseData, function (err) {
            if (err) {
                throw err;
            }
            callback && callback();
        });
    },
    
    /*
     * 添加配置的引用
     * @public
     */
    addCfgRef: function () {
        var target = this.configRefTargetPath;
        var content = '    require(\'biz/'+ this.modName +'/config\');';
        var line = -2;
        pathRef.addRef(target, content, line);
    },
    
    /*
     * 添加css的引用
     * @public
     */
    addCssRef: function () {
        var target = this.cssRefTargetPath;
        var content = '@import \'../biz/' + this.modName + '/css/' + this.modName + '.less\';';
        var line = -1;
        pathRef.addRef(target, content, line);
    }
};

module.exports = exports = Mod;
