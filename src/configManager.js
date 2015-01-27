
/**
 * @file 给新模板添加路径引用类
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var path = require('path');
var u = require('underscore');
var util = require('./util');

var configPath = path.join(process.cwd(), '/egenConfig/config');
var config = require(configPath);

var configManager = {
  
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
    getTaskList: function (args) {
        var template = JSON.stringify(config.taskList);
        var map = this.getCommandMap(args);
        var format = util.format(template, map);
        var taskList = JSON.parse(format);
        taskList = this.addPath(taskList);
        taskList = this.parseCallback(taskList);
        config.taskList = taskList;
        return taskList;
    },
    
    getCommandMap: function (args) {
        var map = {};
        u.each(config.commandMap, function (value, key) {
            key = /\$\{(.+?)\}/.exec(key)[1];
            if (/args/.test(value)) {
                var number = /args(\w+)/.exec(value)[1];
                map[key] = args[number - 1]
            }
            //需要首字母大写的情况
            else if (/Args/.test(value)) {
                var number = /Args(\w+)/.exec(value)[1];
                map[key] = util.toUpperCase(args[number - 1]);
            }
        });
        return map;
    },
    
    addPath: function (taskList) {
        u.each(taskList, function (item, key) {
            if (u.isObject(item)) {
                if (item.type === 'folder' || item.type === 'file') {
                    item.path = item.path || path.join(taskList.path, key);
                }
                return this.addPath(item);
            }
        }, this);
        return taskList;
    },
    
    getTplData: function (tplData) {
        var commonTplData = u.extend({}, config.commonTplData);
        if (u.isBoolean(commonTplData.createDate) && commonTplData.createDate) {
            commonTplData.createDate = util.getFormatDate();
        }
        return u.extend(commonTplData, tplData);
    },
    
    parseCallback: function (taskList) {
        u.each(taskList, function (item, key) {
            if (u.isObject(item)) {
                return this.parseCallback(item);
            }
            if (key === 'callback') {
                item = item.split('.');
                taskList[key] = config[item[1]][item[2]];
            }
        }, this);
        return taskList;
    }
};

util.extend(configManager, config);

module.exports = exports = configManager;
