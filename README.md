## EGEN —— easy generator(or baidu ecom generator)
让我们从开发时繁琐的文件创建、引用、初始化代码中解放人力，把更多的精力关注到业务逻辑上

### 主要专注于下面三件事情
<ol>
    <li>在目标目录生成指定文件</li>
    <li>解析生成的文件，进行变量替换</li>
    <li>添加生成文件的引用路径</li>
</ol>

### 使用简单：仅需三步
<ol>
    <li>项目根目录下创建egenConfig文件夹</li>
    <li>egenConfig中配置config.js文件和所需模板文件</li>
    <li>根目录下运行egen xxx， xxx为配置中的需要从命令行输入的变量，一般为模块名</li>
</ol>

### 使用特点：
<ol>
    <li>一键生成: 一键完成所有文件的创建、路径引用、文件代码初始化</li>
    <li>自定义子命令：用自定义的子命令单独生成单个文件task</li>
    <li>灵活迁移：运行脱离于具体项目，仅依赖于配置文件</li>
</ol>

## 使用简介:
### 安装
<code>npm install -g egen</code>

### 运行
<code>egen xxx</code>  
第一次运行时，项目根目录下如果没有所需的**egenConfig**配置文件夹，会默认生成一个初始的配置，您可以根据业务需求更改配置后使用

### 配置
工具的配置文件在项目的根目录下**egenConfig**文件夹下面, 这个文件夹下需要自己去和写配置文件和模板文件
<ul>
    <li>config.js  ———模块配置文件</li>
    <li>tpl   ———模板文件夹</li>
</ul>  

示例：[https://github.com/strwind/egen/tree/master/demo/helloWorld](https://github.com/strwind/egen/tree/master/demo/helloWorld)

##### config配置文件

    /**
     * @file 模块信息配置
     * @author yaofeifei(yaofeifei@baidu.com）
     * @date 2014-10-30 
     */
    var path = require('path');
    var cwd = process.cwd();
    var join = path.join;
    var tplPath = join(cwd, 'egenConfig/tpl');
    
    var config = {
        /**
         * 命令配置变量映射（可选）
         * args1 代表egen命令后的第一个参数，args2代表第二个，以此类推 
         * Args1 代表第一个参数的第一个字母大写转化， 以此类推
         * ARGS1 代表第一个参数的全部字母大写转化， 以此类推
         */
        'commandMap': {
            '${moduleName}': 'args1',
            '${ModuleName}': 'Args1',
            '${MODULENAME}': 'ARGS1'
        },
        
        /**
         * 模板变量替换字典（可选）
         * 模板变量与配置变量的区别：
         *     模板变量是用于模板中的变量替换
         *     配置变量仅仅用于该config文件中的变量替换
         */
        'commonTplData': {
            'userName': 'yaofeifei',
            'email': 'yaofeifei@baidu.com',
            'createDate': true,
            'moduleName': '${moduleName}',
            'ModuleName': '${ModuleName}',
            'MODULENAME': '${MODULENAME}',
            'customVar': '${moduleName}—${ModuleName}—${MODULENAME}~随意组合%（）&*（%￥%'
        },
        
        /**
         * 模板的变量设置，egen采用的是etpl模板引擎 (可选)
         * 为了解决egen的变量与模板代码中的变量冲突
         * 默认设置为：
         * commandOpen': <%
         * commandClose': %>
         * variableOpen': ${
         * variableClose': }
         */
        'etplSetting': {
            'commandOpen': '<%',
            'commandClose': '%>',
            'variableOpen': '$${',
            'variableClose': '}'
        },
        
        /**
         * 生成任务list
         * 每个有type属性的对象， key名即文件名
         * @type {string} path： 文件路径
         * @type {string} type：文件类型
         * @type {string=} subCommand：子命令
         * @type {string} tplForm: 模板路径
         * @type {Object=} fileReference: 文件引用信息
         * @type {string=} fileReference.path： 文件引用路径
         * @type {string=} fileReference.content： 文件引用的内容
         * @type {number=} fileReference.line： 文件引用的行号
         * @type {Object=} tplData：私有模板配置字典数据
         * type {Function=} callback: 回调函数，这里只配置函数的位置，具体的函数放在handlers中
         */
        'taskList': [
            //资源文件夹配置
            {
                'path': join(cwd, 'assets'),
                'type': 'folder',
                // css文件夹配置
                'css': {
                    'type': 'folder',
                    'subCommand': 'addcss',
                    '${moduleName}.css': {
                        'type': 'file',
                        'tplFrom': join(tplPath, 'css.css'),
                        'callback': 'config.handlers.cssDone'
                    },
                    'callback': 'config.handlers.cssFolderDone'
                },
                'callback': 'config.handlers.assetsFolderDone'
            },
            //依赖文件夹配置
            {
                'path': join(cwd, 'dep'),
                'type': 'folder',
                'callback': 'config.handlers.depFolderDone'
            },
            // html配置
            {
                'path': join(cwd, '${moduleName}.html'),
                'type': 'file',
                'subCommand': 'addhtml',
                'tplFrom': join(tplPath, 'tpl.html'),
                'tplData': {
                    'cssPath': 'assets/css/${moduleName}.css'
                },
                'callback': 'config.handlers.htmlDone'
            }
        ],
        
        /**
         * 处理函数集合（可选）
         */
        'handlers': {
            // status=true为成功,status=false为失败
            'assetsFolderDone': function (status) {
                console.log('assets folder done!');
            },
            'depFolderDone': function (status) {
                console.log('dep folder done!');
            },
            'cssFolderDone': function (status) {
                console.log('css folder done!');
            },
            'htmlDone': function (status) {
                console.log('html file done!');
            },
            'cssDone': function (status) {
                console.log('css file done!');
            }
        }
    };
    
    module.exports = exports = config;

##### **tpl文件夹**下的模板文件配置
采用的是**etpl**模板解析引擎，
    查看语法请猛点：[https://github.com/ecomfe/etpl](https://github.com/ecomfe/etpl)
    
    其中唯一差别是，命令和变量的包裹默认符号不同
    
    commandOpen: '<%'
    commandClose: '%>'
    variableOpen: '${'
    variableClose: '}'

### Quick Start

##### 生成一个命名为**index**的模块

在项目根目录下运行命令<code>egen index</code>

*result:*
<pre>
-assets
    -css
        -index.less
-dep
-index.html
</pre>

##### 使用自定义的子命令addcss

在项目根目录下运行命令<code>egen -addcss demo</code>

*result:*
<pre>
-assets
    -css
        -demo.less
</pre>

