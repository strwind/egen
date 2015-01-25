
/**
 * @file 文件操作类
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var util = require('./util');
var TplParser = require('./TplParser');
var tplParser = new TplParser();

function FileOperator() {
    /*
     * 创建path的容器
     * @type {Object}
     */
    this.container = {};
}

FileOperator.prototype = {
    /*
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
            console.log("文件已存在，未重新生成：" + filePath);
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
            fs.writeFile(filePath, content, function (err, data) {
                if (err) {
                    throw err;
                    callback(err);
                }
                console.log("生成文件成功： " + filePath);
                callback(null);
            });
        });
    },
    
    /*
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
    
    /*
     * 确保创建了相应的目录
     * @param {string} path
     */
    insureDir: function (path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
};

module.exports = exports = FileOperator;
