
/**
 * @file 给新模板添加路径引用类
 * @author yaofeifei(yaofeifei@baidu.com)
 * @date 2014-10-30
 */
var fs = require('fs');
var path = require('path');
var u = require('underscore');
var util = require('./util');

var configPath = path.join(process.cwd(), 'egen-config');
var config = require(configPath);
var reSubCommand = /^-{1,2}(\w+)\s*/;

var configManager = {
    /**
     * 生成文件的时候是否为同步模式
     * @type {boolean}
     * @public
     */
    sync: true,
    
    /**
     * 子命令列表
     * @type {Array}
     * @public
     */
    subCommandList: [],
    /**
     * 配置初始入口
     * @param {Array} args 参数数组
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
    /**
     * 替换变量处理函数
     * @param {Object|Array} source 数据源
     * @param {Object} data 替换的字典
     * @return {Object|Array} 替换变量后的对象
     */
    replace: function (source, data) {
        var template = JSON.stringify(source);
        var format = util.format(template, data);
        return JSON.parse(format);
    },
    /**
     * 根据属性查找对象
     * @param {string} key 键
     * @param {string|number|boolean} value 值
     * @param {Object} source 数据源
     * @return {Object} 查找到的对象
     */
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
    /**
     * 判断是否有子命令
     * @return {boolean}
     */
    hasSubCommand: function () {
        var status = false;
        u.each(this.args, function (arg, index) {
            if (reSubCommand.test(arg)) {
                status = true;
            }
        });
        return status;
    },
    /**
     * 获取生成任务列表
     * @return {Array}
     */
    getTaskList: function () {
        return config.taskList;
    },
    /**
     * 获取子命令任务列表
     * @return {Array}
     */
    getSubCommandTaskList: function () {
        var list = [];
        u.each(this.subCommandList, function (sub, index) {
            list.push(config.subCommandMap[sub]);
        });
        return list;
    },
    /**
     * 获取命令的map数据
     * @return {Object}
     */
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
                map[key] = args[number - 1];
            }
            // 需要首字母大写的情况
            else if (/Args/.test(value)) {
                var number = /Args(\w+)/.exec(value)[1];
                map[key] = util.toUpperCase(args[number - 1]);
            }
            // 需要字母全部大写的情况
            else if (/ARGS/.test(value)) {
                var number = /ARGS(\w+)/.exec(value)[1];
                map[key] = args[number - 1].toUpperCase();
            }
        });
        return map;
    },
    /**
     * 添加path属性,深度添加
     * @param {Object} task 需要添加path的对象
     * @return {Object} 返回该对象
     */
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
    /**
     * 获取模板数据
     * @param {Object} tplData 私有模板替换变量数据
     * @return {Object}
     */
    getTplData: function (tplData) {
        var commonTplData = u.extend({}, config.commonTplData);
        if (u.isBoolean(commonTplData.createDate) && commonTplData.createDate) {
            commonTplData.createDate = util.getFormatDate();
        }
        return u.extend(commonTplData, tplData);
    },
    /**
     * 解析callback, 从字符串改为映射的函数
     * @param {Array} taskList 任务列表
     * @return {Array}
     */
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

u.extend(configManager, config);

module.exports = exports = configManager;
