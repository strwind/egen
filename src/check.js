
/**
 * @file 检查相关配置
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */
var fs = require('fs');
var path = require('path');

//命令运行路径
var currentPath = process.cwd();

var check = {
    
    /**
     * 检查模块运行入口
     * @param {Array} args 命令数组
     */
    init: function (args) {
        if (!this.hasEgenConfig()) {
            process.exit();
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
    }
};

module.exports = exports = check;
