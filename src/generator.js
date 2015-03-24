
/**
 * @file 生成器处理文件
 * @author yaofeifei(yaofeifei@baidu.com)
 * @date 2014-10-30
 */
var path = require('path');
var u = require('underscore');
var util = require('./util');
var cfgMgr = require('./configManager');
var fileOpr = require('./fileOperator');
var pathRef = require('./pathRef');

/**
 * @constuctor
 * 生成器构造函数
 */
function Generator () {}

Generator.prototype = {
    /**
     * 初始化入口
     * @param {Array} args 参数
     * @public
     */
    init: function (args) {
        cfgMgr.init(args);
        var tasks = cfgMgr.getTaskList();
        if (cfgMgr.hasSubCommand()) {
            tasks = cfgMgr.getSubCommandTaskList();
        }
        this.gen(tasks);
    },
    /**
     * 生成任务处理函数
     * @param {Array|Object} parent 任务列表或者任务对象
     * @public
     */
    gen: function (parent) {
        u.each(parent, function (item, key) {
            if (util.isObject(item)) {
                if (item.type === 'folder') {
                    fileOpr.insureDir(item.path);
                    item.callback && item.callback(true);
                }
                else if (item.type === 'file') {
                    var doneHander = function () {
                        item.callback && item.callback(true);
                    };
                    var ref = item.fileReference;
                    if (ref) {
                        doneHander = function () {
                            if (!cfgMgr.sync) {
                                pathRef.addRef(ref.path, ref.content, ref.line, item.callback);
                            }
                            else {
                                pathRef.addRefSync(ref.path, ref.content, ref.line);
                                item.callback && item.callback(true);
                            }
                        };
                    }
                    var data = cfgMgr.getTplData(item.tplData);
                    // 异步模式生成时
                    if (!cfgMgr.sync) {
                        fileOpr.createFile(item.path, item.tplFrom, data, doneHander);
                    }
                    else {
                        fileOpr.createFileSync(item.path, item.tplFrom, data);
                        doneHander();
                    }
                }
                this.gen(item);
            }
            else if (u.isArray(item)) {
                this.gen(item);
            }
        }, this);
    }
};

var generator = new Generator();

module.exports = exports = generator;
