/**
 * @file ${modName}.js ${modName}模块及其相关配置
 * @author ${userName} (${email})
 * @date ${createDate} 
 */
define(function (require) {

    var controller = require('er/dispatcher').controller;
    /**
     * @namespace
     */
    var ${modName} = {};
    
    /**
     * ${modName}.config配置项
     * @type {Object}
     */
    ${modName}.config = {
        /**
         * to delete this comment
         * authority 指有模块权限的角色(一般必须配置)
         * noAuthLocation 指当前角色没权限时页面跳转的地址(一般可不配置，默认系统级别跳转)
         * 如果具体action里也有配置authority/noAuthLocation，
         *    则会覆盖当前module级别的配置(适用于该模块某具体action页面有特殊权限限制的场景) 
         * location 为地址栏中的hash值   
         */
        
        /**
         * 模块标识
         * @type {string}
         */
        id: '${modName}',
        
        /**
         * 有权限的角色，以|分隔
         * @type {string}
         */
        authority: 'ADMIN',
        
        /**
         * 无权限时跳转的地址，可选配置，一般不需要设置
         * @type {string}
         */
        noAuthLocation: '/xxx/xxx',
        
        /**
         * 地址栏location和action的map
         * @type {Array.<Object>}
         */
        action: [
            {
                location: '/${modName}/list',
                action: '${modNameCapitalize}List',
                path: 'biz/${modName}/${modNameCapitalize}List'
            },
            {
                location: '/${modName}/detail',
                action: '${modNameCapitalize}Detail',
                path: 'biz/${modName}/${modNameCapitalize}Detail',
                authority : 'ADMIN|ASSISTANT|IN_SALER|OUT_SALER|ADOWNER'
            },
            {
                location: '/${modName}/form',
                action: '${modNameCapitalize}Form',
                path: 'biz/${modName}/${modNameCapitalize}Form'
            }
        ],
       
        /**
         * 请求后端的url
         * @type {Object}
         */
        url: {
            'list': '/api/${modName}',
            'create': '/api/${modName}',
            'update': '/api/${modName}/{resourceId}',
            'del': '/api/${modName}/{resourceId}',
            'read': '/api/${modName}/{resourceId}'
        },

        /**
         * to delete this comment
         * title 表格标题栏名字
         * dragable 是否能拖拽
         * minWidth 最小宽度
         * breakline 单元格内容是否可换行
         * stable 是否固定像素，若true，则宽度为30px，否则按占配置的百分比算宽度
         * align 单元格里文本对齐方式
         * sortable 是否可排序
         * content 具体单元格内容
         * subEntry 是否有子表格
         * ...
         */        
        /**
         * 列表字段配置
         * @type {Array}
         */
        fields: [
            {
                width: 120,
                stable: 1,
                title: 'id',
                field: 'id',
                content: 'id'
            },
            {
                width: 200,
                stable: 1,
                title: 'name',
                field: 'name',
                content: function (item) {
                    return item['name'];
                }
            },
            /*
            { 
                width: 30,
                title: '消息题目',                
                /* 带气泡的title
                title: function() {
                    return '标题' + dn.util.support.tip('xxx');
                },*
                dragable: 1,
                minWidth: 82,
                breakline: 1,
                stable: 1,
                sortable: 1,
                align: 'left',
                subEntry: 1,
                field: 'newsName',
                content: function(item) {
                    //e.g.1.直接返回数据
                    //return item['newsName'];
                    
                    //e.g.2.对时间处理 
                    //return dn.util.dateFormat(item['newsIssueTime']);
                    
                    //e.g.3.全局字典项中取值 
                    //return er.context.get('messageLevelMap')[item['newsRank']];
                    
                    //e.g.4.截取一定长度加省略号，默认长度50 
                    //return dn.util.getShortText(item['newsContext']);
                    
                    //e.g.5.列表最后一列跳转操作如'修改' 确认框操作如'删除'                     
                    /*
                    var links = [];
                    var options;                    
                    //修改操作
                    links.push({
                      'title': '修改',
                      'location': '#/${modName}/update~id=' + item['id']
                    });
                    
                    //带确认框删除操作
                    options = {
                        'content': '您确定要删除该消息吗？',
                        'handler': 'delete',
                        'ids': item['id']
                    };                    
                    links.push({
                      'title': '删除',
                      'location': 'javascript:void(0);',
                      'onclick': 'dn.util.confirmSingleHandler(\'' + dn.util.stringify(options) + '\');return false;'
                    });
                    
                    return dn.listHelper.operation(links);
                    *
                }
            }
            */
        ]
    };

    /**
     * 生成请求后端的方法
     * @protected
     */
    ${modName}.config.data = (function() {
        var url = ${modName}.config.url;
    
        return dsp.util.daGenerator('${modName}', [
            {
                name: 'list',
                url: url.list,
                method: 'GET'
            },
            {
                name: 'create',
                url: url.create,
                method: 'POST'
            },
            {
                name: 'update',
                url: url.update,
                method: 'PUT'
            },
            {
                name: 'read',
                url: url.read,
                method: 'GET'
            },
            {
                name: 'del',
                url: url.del,
                method: 'DELETE'
            }
        ]);
    })();
    controller.addModule(${modName});
    return ${modName}.config;
});