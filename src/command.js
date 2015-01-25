
/**
 * @file 处理业务命令
 * @author yaofeifei(yaofeifei@baidu.com）
 * @date 2014-10-30 
 */

var util = require('./util');
var Mod = require('./Mod');
var Control = require('./Control');
var command = {
    
    /**
     * 业务命令模块运行入口
     * @param {Array} args 命令数组
     */
    init: function (args) {
        this.commandList = ['addtask', 'addjs', 'addconfig', 'addcss', 'addhtml', 'adddemo'];
        var mainCommand = args[0].toLowerCase();
        //为了区别大小写， 参数需要在命令行输入时用引号包起来
        this.subCommand = util.clearQuotes(args[1]);
        this.arg1 = util.clearQuotes(args[2]); 
        this.arg2 = util.clearQuotes(args[3]);
        
        if (!this.subCommand) {
            console.log('请输入模块名称(控件名称)或子命令!');
            process.exit();
        }
        
        if (mainCommand === 'mod') {
            this.modExec();
        }
        else if (mainCommand === 'ui') {
            this.uiExec();
        }
    },
    
    /**
     * 模块命令路由
     * 生成整个模块 [主命令] [模块名]
     * mod 'hello'
     * 生成单个文件  [主命令] [子命令] [模块名] [任务名=]
     * mod addjs 'hello' 'form'
     */
    modExec: function () {
        var subCommand = this.subCommand;
        var moduleName = this.arg1;
        var taskName = this.arg2;
        if (this.commandList.indexOf(subCommand) === -1) {
            moduleName = subCommand;
        }
        var mod = new Mod(moduleName);
        switch (subCommand) {
            case 'addtask':
                mod.addTask(taskName);
            case 'addjs':
                mod.addJs(taskName);
                break;
                break;
            case 'addcss':
                mod.addCss();
                break;
            case 'addhtml':
                mod.addHtml(taskName);
                break;
            case 'addconfig':
                mod.addConfig();
            default:
                mod.init();
        }
    },
    
    /**
     * 控件命令路由
     * 生成整个完整控件 [主命令] [控件名] [控件父类名=]
     * ui 'Computer' 'InputControl'
     * 生成单个文件[主命令] [子命令] [控件名] [控件父类名=]
     * ui addjs 'Computer' 'InputControl'
     */
    uiExec: function () {
        var subCommand = this.subCommand;
        var ctrName = this.arg1;
        var ctrSupName = this.arg2;
        if (this.commandList.indexOf(subCommand) === -1) {
            ctrName = subCommand;
            ctrSupName = this.arg1;
        }
        var control = new Control(ctrName, ctrSupName);
        switch (subCommand) {
            case 'addjs':
                control.addJs();
                break;
            case 'addcss':
                control.addCss();
                break;
            case 'addhtml':
                control.addHtml();
                break;
            case 'adddemo':
                control.addDemo();
                break;
            default:
                control.init();
        }
    }
};

module.exports = exports = command;