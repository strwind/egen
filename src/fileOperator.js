
/**
 * @file 文件操作类
 * @author yaofeifei(yaofeifei@baidu.com)
 * @date 2014-10-30
 */
var fs = require('fs');
var path = require('path');
var u = require('underscore');
var util = require('./util');
var tplParser = require('./tplParser');

function FileOperator() {
    /**
     * 创建path的容器
     * @type {Object}
     */
    this.container = {};
}

FileOperator.prototype = {
    /**
     * 生成单个文件
     * @param {string} filePath 写入目标文件路径
     * @param {string} tpl 模板文件路径
     * @param {string} parseData 替换模板中变量的数据对象
     * @param {Function} callback 回调函数
     * @public
     */
    createFile: function (filePath, tpl, parseData, callback) {
        var me = this;
        if (fs.existsSync(filePath)) {
            console.log('文件已存在：' + filePath);
            callback(null);
            return;
        }
        if (me.container[filePath]) {
            return;
        }
        me.container[filePath] = 1;
        var option = {
            'encoding': 'utf8'
        };
        fs.readFile(tpl, option, function (err, content) {
            if (err) {
                throw err;
            }
            content = tplParser.compile(content, parseData);
            me.insureFile(filePath);
            fs.writeFile(filePath, content, function (err, data) {
                if (err) {
                    throw err;
                }
                console.log('生成文件成功：' + filePath);
                callback(null);
            });
        });
    },
    /**
     * 读取一个文件，以数组的形式返回，文件中的每一行为数组的一项
     * @param {string} filePath 文件路径
     * @param {Function} callback 回调函数
     * @public
     */
    readFileByArray: function (filePath, callback) {
        var option = {
            'encoding': 'utf8'
        };
        fs.readFile(filePath, option, function (err, data) {
            if (err) {
                throw err;
            }
            var arr = data.split('\n');
            util.trimArrayEnd(arr);
            callback(null, arr);
        });
    },
    /**
     * 确保创建了相应的目录
     * @param {string} dir
     * @param {Function} callback
     */
    insureDir: function (dir, callback) {
        var dirList = this.getDeepDirList(dir);
        u.each(dirList, function (single, index) {
            if (!fs.existsSync(single)) {
                fs.mkdirSync(single);
            }
            if (index >= dirList.length - 1 && callback) {
                callback(true);
            }
        });
    },
    /**
     * 确保创建了相应的文件
     * @param {string} dir
     * @param {Function} callback
     */
    insureFile: function (filePath, callback) {
        this.insureDir(path.dirname(filePath));
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '');
        }
        callback && callback();
    },
    /**
     * 获取深度路径list
     * @param {string} dir 路径
     * @param {Array=} list 路径列表
     * @return {Array} 路径列表
     */
    getDeepDirList: function (dir, list) {
        var list = list || [];
        list.unshift(dir);
        var pre = path.dirname(dir);
        if (pre !== dir) {
            list.concat(this.getDeepDirList(pre, list));
        }
        return list;
    }
};

var fileOperator = new FileOperator();
module.exports = exports = fileOperator;
