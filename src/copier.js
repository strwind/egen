
/**
 * @file 深度复制
 * @author yaofeifei(yaofeifei@baidu.com)
 * @date 2015-01-30
 */

var fs = require('fs');
var path = require('path');

/**
 * 深度复制类
 * @param {options} options 初始参数
 * @constructor
 */
function Copier(options) {
    this.options = options;
}

Copier.prototype = {
    /**
     * 复制目录中的所有文件包括子目录
     * @param {string } sourceSrc 需要复制的目录
     * @param {string } targetSrc 复制到指定的目录
     * @public
     */
    init: function (sourceSrc, targetSrc) {
        var stat = fs.lstatSync(sourceSrc);
        if (stat.isFile()) {
            this.copyFile(sourceSrc, targetSrc);
        }
        else if (stat.isDirectory()) {
            this.copyDir(sourceSrc, targetSrc);
        }
    },
    /**
     * 深度复制文件夹
     * @param {string} sourceSrc 需要复制的目录
     * @param {string} targetSrc 复制到指定的目录
     * @public
     */
    copyDir: function (sourceSrc, targetSrc) {
        var me = this;
        if (!fs.existsSync(targetSrc)) {
            fs.mkdirSync(targetSrc);
        }
        // 读取目录中的所有文件/目录
        var dirs = fs.readdirSync(sourceSrc);
        dirs.forEach(function (dir, index) {
            var childSourceSrc = path.join(sourceSrc, dir);
            var childTargetSrc = path.join(targetSrc, dir);
            var stat = fs.lstatSync(childSourceSrc);
            // 判断是否为文件
            if (stat.isFile()) {
                me.copyFile(childSourceSrc, childTargetSrc);
            }
            // 如果是目录则递归调用自身
            else if (stat.isDirectory()) {
                me.copyDir(childSourceSrc, childTargetSrc);
            }
        });
    },
    /**
     * 复制文件
     * @param {string} sourceSrc 需要复制的目录
     * @param {string} targetSrc 复制到指定的目录
     * @public
     */
    copyFile: function (sourceSrc, targetSrc) {
        var content = fs.readFileSync(sourceSrc);
        fs.writeFileSync(targetSrc, content);
    }
};
var copier = new Copier();

module.exports = exports = copier;
