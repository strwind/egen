
/**
 * @file 给新模板添加路径引用类
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var path = require('path');
var util = require('./util');
var configPath = path.join(process.cwd(), '/egenConfig/config');
var config = require(configPath);

var configManager = {
    /*
     * 模块的默认任务名字
     * @type {Array}
     */
    defaultModTaskList: ['form', 'list', 'detail'],
    
    /*
     * 获取模块任务集合
     * @param {string} modName 模块名字
     * @return {Object} 详细的任务集合
     */
    getModTaskCollection: function (modName) {
        var me = this;
        var taskCollection = {};
        this.defaultModTaskList.forEach(function (taskName, index) {
            var task = me.getModTask(modName, taskName);
            taskCollection[taskName] = task;
        });
        taskCollection.config = me.getModTask(modName);
        taskCollection.css = me.getModTask(modName);
        return taskCollection;
    },
    
    /*
     * 获取模块默认任务的配置
     * @param {string} modName 模块名字
     * @param {string=} taskName 任务名字
     * @return {Object} task 任务的详细配置
     *          task.userName 用户名称
     *          task.email 用户邮箱
     *          task.createDate 创建日期
     *          task.modName 模块名称
     *          task.modNameCapitalize 首字母大写的模块名称
     *          task.taskName 任务名称
     *          task.actionName 生成的action的名称
     *          task.tplFileName 生成的html模板文件名, 默认为任务名
     *          task.viewName 生成的html模板内的target名字, 默认和actionName一致
     */
    getModTask: function (modName, taskName) {
        var task = {};
        util.extend(task, this.userInfo);
        util.extend(task, {
            'modName': modName,
            'modNameCapitalize': util.toUpperCase(modName),
            'createDate': util.getFormatDate()
        });
        if (taskName) {
            var actionName = util.toUpperCase(modName) + util.toUpperCase(taskName);
            util.extend(task, {
                'taskName': taskName,
                'actionName': actionName,
                'tplFileName': taskName,
                'viewName': actionName,
            });
         }
        return task;
    },
    
    /*
     * 获取控件默认单个任务的配置
     * @param {string} ctrName 控件名字
     * @param {string=} ctrSupName 控件父类名称
     * @return {Object} task 任务的详细配置
     *          task.userName 用户名称
     *          task.email 用户邮箱
     *          task.createDate 创建日期
     *          task.ctrName 控件名称
     *          task.className 控件类名
     *          task.superClassName 控件的父类名
     *          task.viewName 模板名，默认为类名
     *          task.type 控件类的配置，可选，一般是className的小写
     *          task.cssFileName 生成的css文件名字, 默认和类的小写，
     *          task.demoFileName 生成的Demo文件名字, 默认和类名一致
     */
    getCtrTask: function (ctrName, ctrSupName) {
        var task = {};
        util.extend(task, this.userInfo);
        util.extend(task, {
            'createDate': util.getFormatDate(),
            'ctrName': ctrName,
            'className': ctrName,
            'superClassName': ctrSupName || 'Control',
            'viewName': 'UI' + ctrName,
            'type': ctrName.toLowerCase(), 
            'cssFileName': 'ui-' + ctrName.toLowerCase(),
            'demoFileName': 'ui.' + ctrName
        });
        return task;
    }
};

util.extend(configManager, config);

module.exports = exports = configManager;
