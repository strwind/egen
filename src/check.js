
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
            console.log('\n正在初始化egen配置文件...\n');
            this.createConfig();
            this.createTplDir();
            console.log('初始化egen配置完成,请根据业务需求修改使用\n');
            var dirArr = fs.readdirSync(currentPath);
            if (dirArr.length !== 2 || args[0] === '--init') {
                process.exit();
            }
            console.log('下面生成初始配置的页面：\n');
        }
        else if (args[0] === '--init') {
            console.log('egen-config.js已经存在!\n');
        }
    },
    /**
     * 是否有配置文件
     * @return {boolean}
     */
    hasEgenConfig: function () {
        var configFile = path.join(currentPath, 'egen-config.js');
        if (!fs.existsSync(configFile)) {
            return false;
        }
        return true;
    },
    
    /**
     * 是否有配置模板文件夹
     * @return {boolean}
     */
    hasEgenTpl: function () {
        var egenTplPath = path.join(currentPath, 'egenTpl');
        if (!fs.existsSync(egenTplPath)) {
            return false;
        }
        return true;
    },
    
    /**
     * 创建默认的配置文件
     * @private 
     */
    createConfig: function () {
        var egenDir = path.dirname(path.dirname(process.argv[1]));
        var defaultCfgPath = path.join(egenDir, 'demo/helloWorld/egen-config.js');
        var currentCfgPath = path.join(process.cwd(), 'egen-config.js');
        copier.init(defaultCfgPath, currentCfgPath);
    },
    
    /**
     * 创建默认的配置模板文件夹
     * @private 
     */
    createTplDir: function () {
        var egenDir = path.dirname(path.dirname(process.argv[1]));
        var defaultTplPath = path.join(egenDir, 'demo/helloWorld/egenTpl');
        var currentTplPath = path.join(process.cwd(), 'egenTpl');
        copier.init(defaultTplPath, currentTplPath);
    }
};

module.exports = exports = check;
