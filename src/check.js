
/**
 * @file 检查相关配置
 * @author yaofeifei(yaofeifei@baidu.com)
 * @date 2014-10-30
 */
var fs = require('fs');
var path = require('path');
var copier = require('./copier');

// 命令运行路径
var currentPath = process.cwd();

var check = {
    /**
     * 检查模块运行入口
     * @param {Array} args 命令数组
     */
    init: function (args) {
        if (!this.hasEgenConfig()) {
            this.createCfgDir();
        }
    },
    /**
     * 是否有配置文件夹
     * @return {boolean}
     */
    hasEgenConfig: function () {
        var egenConfigPath = path.join(currentPath, 'egenConfig');
        var configFile = path.join(egenConfigPath, 'config.js');
        if (!fs.existsSync(egenConfigPath)) {
            console.log('error：请在项目根目录配置egen运行所需的配置文件夹egenConfig\n可参考https://github.com/strwind/egen/demo/egenConfig');
            return false;
        }
        if (!fs.existsSync(configFile)) {
            console.log('error：请在项目根目录egenConfig文件夹中配置config.js文件!');
            return false;
        }
        return true;
    },
    /**
     * 创建默认的配置文件
     * @private 
     */
    createCfgDir: function () {
        var egenDir = path.dirname(path.dirname(process.argv[1]));
        var defaultCfgPath = path.join(egenDir, 'demo/helloWorld/egenConfig');
        var currentCfgPath = path.join(process.cwd(), 'egenConfig');
        copier.init(defaultCfgPath, currentCfgPath);
    }
};

module.exports = exports = check;
