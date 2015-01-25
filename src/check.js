
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
        var cfgMgr = require('./configManager');
        var modCfg = cfgMgr.module;
        var ctrCfg = cfgMgr.control;
        var checkArr = [] ;
        var mainCommand = args[0].toLowerCase();
        if (mainCommand === 'mod') {
            checkArr.push(this.hasTarget(modCfg.targetPath));
            checkArr.push(this.hasTpl(modCfg.tplPath));
            if (modCfg.hasMockup) {
                checkArr.push(this.hasMockup(modCfg.mockupPath));
            }
            if (modCfg.hasCssRef) {
                checkArr.push(this.hasCssRefFile(modCfg.cssRefTargetPath));
            }
            if (modCfg.hasConfigRef) {
                checkArr.push(this.hasConfigRefFile(modCfg.configRefTargetPath));
            }
        }
        else if (mainCommand === 'ui') {
            checkArr.push(this.hasTarget(ctrCfg.targetPath));
            checkArr.push(this.hasTpl(ctrCfg.tplPath));
            if (ctrCfg.hasDemo) {
                checkArr.push(this.hasDemo(ctrCfg.demoPath));
            }
            if (ctrCfg.hasCssRef) {
                checkArr.push(this.hasCssRefFile(ctrCfg.cssRefTargetPath));
            }
            if (ctrCfg.hasDemoRef) {
                checkArr.push(this.hasDemoRefFile(ctrCfg.demoRefTargetPath));
            }
        }
        else {
            console.log('error: 输入的命令错误，请运行<--help>查看帮助信息！');
            checkArr.push(false);
        }
        checkArr.forEach(function (success, index) {
            !success && process.exit();
        });
    },
    /**
     * 是否有配置文件夹
     * @return {boolean} 
     */
    hasEgenConfig: function () {
        var egenConfigPath = path.join(currentPath, 'egenConfig');
        var configFile = path.join(egenConfigPath, 'config.js');
        if (!fs.existsSync(egenConfigPath)) {
            console.log('error：请在项目根目录配置egen运行所需的配置文件夹egenConfig\n可参考https://github.com/strwind/egenConfig');
            return false;
        }
        if (!fs.existsSync(configFile)) {
            console.log('error：请在项目根目录egenConfig文件夹中配置config.js文件!');
            return false;
        }
        return true;
    },
    /**
     * 是否有目标文件夹配置
     * @param {string} targetPath 生成模块目标路径
     * @return {boolean} 
     */
    hasTarget: function (targetPath) {
        if (!fs.existsSync(targetPath)) {
            console.log('error：请在配置文件中配置相应的生成目标路径<targetPath>!');
            return false;
        }
        return true;
    },
    /**
     * 是否有模板文件夹配置
     * @param {string} tplPath tpl路径
     * @return {boolean} 
     */
    hasTpl: function (tplPath) {
        if (!fs.existsSync(tplPath)) {
            console.log('error：请在配置文件中配置相应的模板路径<tplPath>!');
            return false;
        }
        return true;
    },
    /**
     * 是否有MOCK文件夹配置
     * @param {string} mockupPath mockup路径
     * @return {boolean} 
     */
    hasMockup: function (mockupPath) {
        if (!fs.existsSync(mockupPath)) {
            console.log('error：请在配置文件中配置相应的mockup路径<mockupPath>!');
            return false;
        }
        return true;
    },
    /**
     * 是否有添加css路径的文件配置
     * @param {string} cssRefTargetPath 添加css引用的路径
     * @return {boolean} 
     */
    hasCssRefFile: function (cssRefTargetPath) {
        if (!fs.existsSync(cssRefTargetPath)) {
            console.log('error：请在配置文件中配置相应的css引用路径<cssRefTargetPath>!');
            return false;
        }
        return true;
    },
    /**
     * 是否有添加config路径的文件配置
     * @param {string} configRefTargetPath 添加config引用的路径
     * @return {boolean} 
     */
    hasConfigRefFile: function (configRefTargetPath) {
        if (!fs.existsSync(configRefTargetPath)) {
            console.log('error：请在配置文件中配置相应的config引用路径<configRefTargetPath>!');
        }
        return true;
    },
    /**
     * 是否有demo文件夹配置
     * @param {string} demoPath demo路径
     * @return {boolean} 
     */
    hasDemo: function (demoPath) {
        if (!fs.existsSync(demoPath)) {
            console.log('error：请在配置文件中配置相应的demo路径<demoPath>!');
            return false;
        }
        return true;
    },
    /**
     * 是否有添加demo路径的文件配置
     * @param {string} demoRefTargetPath 添加demo引用的路径
     * @return {boolean} 
     */
    hasDemoRefFile: function (demoRefTargetPath) {
        if (!fs.existsSync(demoRefTargetPath)) {
            console.log('error：请在配置文件中配置相应的demo引用路径<demoRefTargetPath>!');
        }
        return true;
    }
};

module.exports = exports = check;
