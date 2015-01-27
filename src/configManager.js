
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
var reSubCommand = /^-(\w+)\s*/;

var configManager = {
    /**
     * 子命令列表
     * @type {Array} 
     * @public
     */
    subCommandList: [],
    
    /**
     * 配置初始入口
     * @param {Array} args参数数组
     * @public 
     */
    init: function (args) {
        this.args = args;
        this.configFormat();
        this.initSubCommandMap();
    },
    
    /**
     * 配置中的变量替换
     * @public 
     */
    configFormat: function () {
        var map = this.getCommandMap();
        config.taskList = this.replace(config.taskList, map);
        config.taskList = this.addPath(config.taskList);
        config.taskList = this.parseCallback(config.taskList);
        config.commonTplData = this.replace(config.commonTplData, map);
    },
    /**
     * 初始化子命令映射
     * @public 
     */
    initSubCommandMap: function () {
        config.subCommandMap = {};
        u.each(this.args, function (arg, index) {
            var exec = reSubCommand.exec(arg);
            if (!exec) {
                return;
            }
            var sub = exec[1];
            this.subCommandList.push(sub);
            config.subCommandMap[sub] = this.getItemByAttribute('subCommand', sub, config.taskList);
        }, this);
    },
    
    replace: function (target, map) {
        var template = JSON.stringify(target);
        var format = util.format(template, map);
        return JSON.parse(format);
    },
    
    getItemByAttribute: function (key, value, source) {
        var target;
        u.each(source, function (item, index) {
            if (!u.isObject(item) && !u.isArray(item)) {
                return;
            }
            if (item[key] === value) {
                target = item;
            }
            else if (!target) {
                target = this.getItemByAttribute(key, value, item);
            }
        }, this);
        return target;
    },
    
    isSubCommand: function () {
        var status = false;
        u.each(this.args, function (arg, index) {
            if (reSubCommand.test(arg)) {
                status = true;
            }
        });
        return status;
    },
    
    /*
     * 获取生成任务列表
     */
    getTaskList: function () {
        return config.taskList;
    },
    
    /*
     * 获取子命令任务列表
     */
    getSubCommandTaskList: function () {
        var list = [];
        u.each(this.subCommandList, function (sub, index) {
            list.push(config.subCommandMap[sub]);
        });
        return list;
    },
    
    getCommandMap: function () {
        var map = {};
        var args = u.extend([], this.args);
        u.each(args, function (arg, index) {
            if (reSubCommand.test(arg)) {
                args = args.slice(1);
            }
        });
        if (!args.length) {
            return map;
        }
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
    
    addPath: function (task) {
        u.each(task, function (item, key) {
            if (u.isObject(item)) {
                if (item.type === 'folder' || item.type === 'file') {
                    item.path = item.path || path.join(task.path, key);
                }
                return this.addPath(item);
            }
        }, this);
        return task;
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
