
#Easy generator —— 百度DSP 脚手架工具
该工具能让我们从开发时繁琐的文件创建、引用、配置中解放人力，把更多的精力关注到业务逻辑上

### 安装      
<code>npm install -g egen</code>

###命令行说明
<p>中括号包括起来的为参数，括号中以等号结尾的为可选参数</p>
<p>参数在命令行中输入时，<b>有字母大写时需要用引号包起来</b></p>
<p>[模块名]、[控件名]、[父类名]为自定义,[任务名]为form、list、detail中的一项</p>

### 生成模块命令       
<p><code>egen mod [模块名]</code>    --生成模块所有所需文件</p>

#####二级子命令
<p><code>egen mod addtask [模块名] [任务名]</code>    --生成模块指定任务的所有文件</p>
<p><code>egen mod addjs [模块名] [任务名]</code>    --生成模块所需的js文件</p>
<p><code>egen mod addcss [模块名]</code>    --生成模块所需的less文件</p>
<p><code>egen mod addhtml [模块名] [任务名]</code>    --生成模块所需的tpl文件</p>
<p><code>egen mod addconfig [模块名]</code>    --生成模块所需的config文件</p>


### 生成UI控件命令  
<p><code>egen ui [控件名] [父类名=]</code>    --生成控件所有所需文件</p>

#####二级子命令
<p><code>egen ui addjs [控件名] [父类名=]</code>    --生成控件所需的js文件</p>
<p><code>egen ui addcss [控件名] [父类名=]</code>    --生成控件所需的less文件</p>
<p><code>egen ui addhtml [控件名] [父类名=]</code>    --生成控件所需的tpl文件</p>
<p><code>egen ui adddemo [控件名] [父类名=]</code>    --生成控件所需的demo文件</p>


###详细说明
生成模块和UI控件其实做了下面三件事情
<ol>
    <li>生成模块或控件所需要的文件，包含所需的tpl、css、js、config、demo 几类文件</li>
    <li>解析生成的模板文件</li>
    <li>添加生成文件的引用路径</li>
</ol>

###工具配置
<p>**配置示例：** <code>https://github.com/strwind/egenConfig</code></P>
工具的配置文件在项目的根目录下**egenConfig**文件夹下面, 这个文件夹下需要自己去和写配置文件和模板文件
<ul>
    <li>config.js  ———模块配置文件</li>
    <li>tpl   ———模板文件夹</li>
</ul>

#####config配置文件
<pre>
var path = require('path');
var cwd = process.cwd();
var join = path.join;
var config = {
    
    /*
     * 用户信息配置
     * userName 用户姓名
     * email 用户邮箱
     */
    'userInfo': {
        "userName": "yaofeifei",
        "email": "yaofeifei@baidu.com"
    },
    
    /*
     * 模块配置
     * bizPath 生成模块代码的路径
     * tplPath 模块的模板所在路径
     * cssRefTargetPath 模块的css文件需要添加引用的路径
     * configRefTargetPath 模块的config文件需要添加的引用路径
     */
    'module': {
        'bizPath': join(cwd, 'src/biz'),
        'tplPath': join(cwd, 'egenConfig/tpl/mod'),
        'cssRefTargetPath': join(cwd, 'src/css/main.less'),
        'configRefTargetPath': join(cwd, 'src/biz/moduleConfig.js')
    },
    
    /*
     * 控件配置
     * bizPath 生成控件代码的路径
     * tplPath 控件的模板所在路径
     * cssRefTargetPath 控件的css文件需要添加引用的路径
     * demoPath 控件demo生成的路径
     * demoRefTargetPath 控件demo导航的引用路径
     */
    'control': {
        'bizPath': join(cwd, 'src/ui'),
        'tplPath': join(cwd, 'egenConfig/tpl/ui'),
        'cssRefTargetPath': join(cwd, 'src/ui/css/ui-all.less'),
        'demoPath': join(cwd, 'test/ui/demo'),
        'demoRefTargetPath': join(cwd, 'test/ui/demo/index_nav.html')
    }
};

module.exports = exports = config;
</pre>

#####模板
模板文件在**tpl**文件夹下面,模板内容有待补充
<ul>
    <li>mod  ———模块的模板文件夹</li>
    <li>ui   ———UI控件的模板文件夹</li>
</ul>

###Quick Start

##### 生成一个命名为‘demo’的模块

在项目根目录下运行命令<code>egen mod demo</code>

**result:**

在目录**src/biz**下将会生成我们所需的开发模块文件,每个文件中已经写好了代码结构和常用方法
<pre>
-demo
    -css
        -demo.less
    -tpl
        -form.tpl.html
        -list.tpl.html
        -detail.tpl.html
    -config.js
    -DemoForm.js
    -DemoList.js
    -DemoDetail.js
</pre>

<p>demo.css成功在main.css中添加了应用路径，引用语句为<code>@import '../biz/demo/css/demo.less';</code></p>
<p>config.js成功在moduleConfig.js中添加了应用路径，引用语句为<code>require('biz/demo/config');</code></p>

浏览器中打开<code>http://dsptest.baidu.com:8848/main.html#/demo/form </code>即可看到写好的模块


##### 生成一个命名为‘Hello’的控件

在项目根目录下运行命令<code>egen ui 'Hello' 'Label'</code>

**result:**

在目录**src/ui**下将会生成我们所需的开发控件文件,该控件继承Label控件,每个文件中已经写好了代码结构和常用方法
<pre>
-ui
    -css
        -ui-hello.less
    -tpl
        -Hello.html
    -Hello.js
</pre>

在目录**test/ui/demo**下将会生成我们所开发控件的DEMO文件,每个文件中已经写好了代码结构和常用方法
<pre>
-demo
    -ui.Hello.html
</pre>


<p>ui-hello.less成功在ui-all.less中添加了应用路径，引用语句为<code>@import './ui-hello.less';</code></p>
<p>ui.Hello.html成功在index_nav.html中添加了导航

浏览器中打开<code>http://dsptest.baidu.com:8080/test/ui/demo/ui.Hello.html </code>即可看到写好的控件demo


###TODO
<ol>
    <li>mock文件的生成</li>
    <li>集成到edp</li>
    <li>做成公共通用工具, 假如每个项目团队的开发目录、命令规则、文件引用等方式不统一，预计会需要大量的配置</li>
</ol>

