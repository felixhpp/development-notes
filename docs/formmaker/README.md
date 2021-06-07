---
title: 帮助文档
date: 2021-06-03 17:33:49
permalink: /pages/864441/
categories:
  - formmaker
tags:
  - a
  - b
---
# 表单设计器使用说明文档

## 功能介绍

​       基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element) 实现的表单设计器。通过在表单设计器的**设计页面**进行控件的**拖拽**和**配置**等操作，生成**表单元数据**，并使用`json`数据格式保存表单元数据。在**表单填写**页面中，对已经保存的表单元数据进行**解析渲染**及**数据接口**绑定和**事件**绑定，对填写表单的**内容数据**通过后台接口保存，使用`json`数据结构，以`key:value`的形式保存。

### 功能区域

- 顶部菜单操作区
  - 保存、预览、撤销、重做、复制、粘贴、上移、下移、清空、查看JSON、查看指引等。
- 左侧控件列表
- 中间表单容器操作区域
- 右侧控件配置区域
  - 字段属性 ：对控件进行详细配置，基于element-ui提供的可配置的选项，封装的组件配置选项。
      - 一般包含标题属性和值属性
  - 事件：单击、双击、失去焦点、获得焦点、值改变、内部接口等。
      - 点击右侧事件区域的任意类型事件添加事件，弹出模态框
      - 模态框包括**事件类型**、**判断条件**、**执行操作**
      - **事件类型**包括：*单击*、*双击*、*失去焦点*、*获得焦点*、*值改变*
      - **判断条件**包括：单个条件、多个条件
        - 单个条件包括：`控件` `比较词`(大于、小于、包含、等于...) `比较值`(静态值、动态值)
        - 多个条件包括：单个条件与条件连接词(`and | or`)
      - **执行操作**包括: 选取函数，添加参数（可以添加多个参数，参数可以为静态值、动态值）
  - 表单属性：对表单整体风格样式的配置。表单事件、观测阶段。

![crf表单](https://gitee.com/felixhpp/markdown/raw/master/uPic/crf表单.png)

### 组件列表

- 基础字段
  - [x] 单行文本  
  - [x] 数值输入框 
  - [x] 多行文本
  - [x] 单选框组 
  - [x] 多选框组
  - [x] 下拉选择框
  - [x] 字典
  - [x] 时间选择器
  - [x] 日期选择器
  - [x] 对象
  - [x] 数组
  - [x] 文字
  - [x] 链接
  - [x] 分割线
  - [x] 图片
  
- 组合字段

  - [x] 分组
  - [x] 面板
  - [x] 分组(多列)
  - [x] 面板(多列)
  - [x] 矩阵
  
- 布局字段

  - [x] 两列布局
  - [x] 三列布局
  - [x] 自定义布局

### 事件列表
    
#### 1.功能函数

显示、隐藏、可用、禁用

#### 2.计算函数
1. 计算BMI、平均动脉压
2. 函数 加、减、乘、除、及其混合运算 （参数可选静态值或动态值） 
3. 赋值函数，可以为某个组件赋值为某个值
4. 最大值、最小值函数
5. 日期相关函数：计算两个日期的差，可配置单位：日/小时；计算指定日期的之前/之后指定时间间隔的日期


## 组件使用说明

### 传统js文件引用的方式使用插件

普通的前端使用需要引入相关的js和css文件

#### `FormMaking` 组件引入
```
	<link rel="stylesheet" href="../dist/FormMaking.css">
	<script src="../public/lib/ace/ace.js"></script>
	<script src="../dist/FormMaking.umd.min.js"></script>
```

示例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>FormMaking demo</title>
		<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@2.4/lib/index.css">
		<link rel="stylesheet" href="../dist/FormMaking.css">
	</head>
	<body>
		<div id="app">
		   <form-make ref="fm"
		        :get-json-data="getJSONData" 
		        :get-de-settings="getDESettings" 
                :get-external-data="getExternalData" 
                :get-dictionary-tree="getDictionaryTree"
                :get-dictionary-items="getDictionaryItems"
		        :is-form-preview-in-dialog="true"
		        @save-json-data="saveHandle"
		        @show-data="showData"
		    ></form-make>
		  </div>
		<script src="https://unpkg.com/vue/dist/vue.js"></script>
		<script src="https://unpkg.com/element-ui/lib/index.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/vant@2.4/lib/vant.min.js"></script>
		<script src="../public/lib/ace/ace.js"></script>
		<script src="../dist/FormMaking.umd.min.js"></script>
		<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
		<script type="text/javascript">
			var vm = new Vue({
				el:'#app',
				data: {
				        fm: {},
				},
				methods: {
				  getJSONData(setJSONData) {
				  	$.ajax({
				  		url:'/jsondata',
				  		type:'get',
				  		dataType:'json',
				  		success:function(jsonData){
				  			setJSONData(jsonData)
				  		}
				  	})
				  },
				  getDESettings(setDESettings) {
				  	$.ajax({
				  		url:'/desettings',
				  		type:'get',
				  		dataType:'json',
				  		success:function(DESettings){
				  			if (DESettings.Result) {
				  			    setDESettings(DESettings.DataObject)
				  			}
				  		}
				  	})
				  },
				  getExternalData(setExternalData){
					  $.ajax({
					  	url:'/externaldata',
					  	type:'get',
					  	dataType:'json',
					  	success:function(res){
					  		if (res.Result) {
					  		    setExternalData(res.DataObject)
					  		}
					  	}
					  })
				  },
                  getDictionaryTree(setDictionaryTree) {
                        $.ajax({
                            url: "/dictionarytree",
                            type: "get",
                            dataType: "json",
                            success: function(res) {
                                if (res.status == 200) {
                                    setDictionaryTree(res.data)
                                } else {
                                    vm.$message({
                                        type: "error",
                                        message: "请求字典表失败" + res.msg
                                    })
                                }
                            }
                        })
                    },
                    getDictionaryItems(setDictionaryItems, node) {
                        $.ajax({
                            url: "/dictionaryitems",
                            type: "get",
                            dataType: "json",
                            success: function(res) {
                                if (res.status == 200) {
                                    setDictionaryItems(res.data)
                                } else {
                                    vm.$message({
                                        type: "error",
                                        message: "请求字典表项失败" + res.msg
                                    })
                                }
                            }
                        })
                    },
				    saveHandle(widgetForm) {
				        console.log(widgetForm)
				        const loading = this.$loading({
				            lock: true,
				            text: '保存中...'
				        });
				        setTimeout(() => { // 模拟保存方法
				            loading.close();
				            this.$message({
				                message: '保存成功',
				                type: 'success'
				            });
				        }, 800);
				
				    },
				    showData(data){
				        console.log(data)
				    }
				},
				mounted(){
				    this.fm=this.$refs.fm
				}
			})
			console.log(FormMaking)
		</script>
	</body>
</html>

```

#### `GenerateForm` 组件引入

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>FormRender demo</title>
		<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@2.4/lib/index.css">
		<link rel="stylesheet" href="../dist/FormMaking.css">
	</head>
	<body>
		<div id="app">
			<fm-generate-form ref="gf" 
				:json-data="jsonData" 
				:value.sync="editData" 
                @field-value-change="fieldValueChange"
				:has-operate-btn="false" 
				:get-de-settings="getDESettings"
				:get-external-data="getExternalData">
			</fm-generate-form>
		</div>
		<button id="commit">提交</button>
		<button id="reset">重置</button>
		<script src="https://unpkg.com/vue/dist/vue.js"></script>
		<script src="https://unpkg.com/element-ui/lib/index.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/vant@2.4/lib/vant.min.js"></script>
		<script src="../public/lib/ace/ace.js"></script>
		<script src="../dist/FormMaking.umd.min.js"></script>
		<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
		<script type="text/javascript">
			var vm = new Vue({
				el: '#app',
				data: {
					gf: {},
					editData: {
						'input_1': 1
					},
					jsonData: {}  //【同步或者异步获取的表单元数据JSON对象】
				},
				methods: {
					getDESettings(setDESettings) {
						$.ajax({
							url: '/desettings',
							type: 'get',
							dataType: 'json',
							success: function(DESettings) {
								if (DESettings.Result) {
									setDESettings(DESettings.DataObject)
								}
							}
						})
					},
					getExternalData(setExternalData,jsonData) {
						$.ajax({
							url: '/externaldata',
							type: 'get',
							dataType: 'json',
							success: function(ExternalData) {
								if (ExternalData.Result) {
									setExternalData(ExternalData.DataObject)
								}
							}
						})
                    },
                    fieldValueChange(key,newVal,oldVal,$vm){
                        console.log(key,newVal,oldVal,$vm)
                    }
				},
				mounted() {
					this.gf = this.$refs.gf
				}
			})
			$('#commit').click(function() {
				vm.gf.getData().then(function(data) {
					console.log(data)
				})
			})
			$('#reset').click(function() {
				vm.reset()
			})
		</script>
	</body>
</html>


```

## Vue项目使用

在vue项目可以分为：全局注册和局部注册

#### 全局使用

首先在`index.html`中引入打包成为插件的`FormMaking.css`和`FormMaking.umd.js`


```html
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <title><%= htmlWebpackPlugin.options.title %></title>
  <link rel="stylesheet" href="<%= BASE_URL %>form-make/FormMaking.css">
</head>

<body>
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
      Please enable it to continue.</strong>
  </noscript>
  <div id="app">
    
  </div>
  <!-- built files will be auto injected -->
  <script src="<%= BASE_URL %>ace/ace.js"></script>
  <script src="<%= BASE_URL %>form-make/FormMaking.umd.js"></script>
</body>

</html>
```


在`main.js` 或者`app.vue`中全局注册组件


```vue
<template>
  <div id="app">
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'App',
  created () {
    Vue.use(window.FormMaking);
  },
}
</script>

```



#### 组件内使用
组件内使用可以单独引入子组件，子组件包括：
* 表单设计组件`FormMake`
* 表单渲染组件`GenerateForm`


`FormMake`组件引入

示例：
```js
<template>
  <div>
    <form-make></form-make>
  </div>
</template>

<script>
  import {FormMake} from '@/assets/form-make/FormMaking.umd.js'
  export default {
    name:'Demo',
    components:{FormMake},
    data () {
      return {
        
      }
    }
  }
</script>
```


`GenerateForm`组件引入

示例：
``` js
<template>
  <generate-form ref="gf" >
  </generate-form>
</template>
<script>
  import {GenerateForm} from '@/assets/form-make/FormMaking.umd.js'
  export default {
    name:'Demo',
    components:{GenerateForm},
    data () {
      return {
        
      }
    }
  }
</script>
```


## api 说明

|参数				   |说明	  			|绑定方式	       |类型		          |
|----------------------|---------------------|---------------------|---------------------|
|json-data					|表单元数据json对象								|v-bind		|Object		|
|get-json-data				|获取表单元数据json并赋值的方法					|v-bind		|Function	|
|json-data-http-option		|获取表单元数据json并赋值方法http请求对象参数		|v-bind		|Object		|
|de-settings				|外部接口配置数据								|v-bind		|Object		|
|get-de-settings			|获取外部接口配置信息的方法						|v-bind		|Function	|
|de-settings-http-option	|获取外部接口配置信息的方法http请求对象			|v-bind		|Object		|
|external-data				|外部数据对象									|v-bind		|Object		|
|get-external-data			|获取外部数据对象方法							|v-bind		|Function	|
|external-data-http-option	|获取外部数据对象方法http请求参数对象				|v-bind		|Object		|
|get-dictionary-tree		|获取字典树第方法							|v-bind		|Function	|
|get-dictionary-item		|获取字典项方法							|v-bind		|Function	|
|is-form-preview-in-dialog	|点击【预览】按钮时，是否以对话框形式				|v-bind		|Boolean	|
|save-json-data				|点击【保存】按钮时，执行的方法					|v-on		|Function	|
|show-data					|点击表单预览中的【获取数据】按钮时执行的方法		|v-on		|Function	|
|upload-img	|上传图片相关配置，对象类型，uploadUrl:上传地址，baseUrl:基础路径	|v-on	|Object	|




## 表单元数据结构说明

### JSON元数据示例

```json
{
	"list": [ // list--保存表单所有组件(widget)的数组，数组中每个对象对应表单中的每个字段的配置
		{
			"type": "input", // 类型 英文名
            "icon": "icon-input", // 图标
            "name": "单行文本", // 类型 中文名
			"key": "input_1", // 字段标识
			"label": "姓名", // 字段标题
			"options": { // 字段属性配置
				"width": "30", // 宽度
				"compareable": false, // 是否可比较
				"show": true, // 是否显示
				"unit": "", // 单位
				"defaultValue": "", // 默认值
				"required": false, // 是否必填
				"dataType": "string", // 数据格式
				"pattern": "", // 自定义的正则校验表达式字符串
				"placeholder": "", // 占位内容
				"disabled": false, // 是否禁用
				"remoteFunc": "func_input_1" // 远端方法名(暂时未用到)
            },
            "rules": [ // 跟据校验规则生成的所有的验证器 主要是由required、dataType、pattern属性生成
				{
					"type": "string",
					"message": "单行文本格式不正确"
				}
			],
			"event": { // 事件 
				"key": "input_1", // 事件绑定对象的控件key(字段标识)
				"types": { // 绑定的所有事件类型
					"click": [ // 单击事件
						{
							"name": "事件1", // 事件名称
							"condition": { // 事件触发的判断条件
								"logic": "and", // 判断逻辑连接符 and | or
								"statements": [ // 所有判断条件组成的语句数组
									{
										"key": "input_1", // 判断语句的条件对象key
										"connector": "eq", // 判断语句比较符 (eq | neq | gt | lt | in) (= | ≠ | > | < | 包含)
										"value": "1", // 判断语句的比较值
										"value_type": "0" // 判断语句的比较值类型 "0":静态值 | "1":动态值(value为比较对象key) 
									}
								]
							},
							"operate": [ // 当前事件执行的所有操作方法
								{
									"function_name": "hide", // 操作方法名
									"label": "隐藏", // 操作方法中文名
									"options": { // 操作方法传递的参数
										"widget_list": [ // 控件列表
											[ // 控件的路径 例如: 分组1(group_1)/姓名(input_1) => ["group_1","input_1"]
												"input_1"
											]
										]
									}
								}
							]
						}
					],
					"dblclick": [], // 双击事件
					"blur": [], // 失去焦点事件
					"focus": [], // 获取焦点事件
					"change": [] // 值改变事件
				}
			},
			"externaldataInfo": { // 外部数据接口相关配置
				"CatID": 1, // 接口类别ID
				"ItemCategoryCode": 1, // 配置项目分类ID
				"ItemCode": 1632, // 配置项目ID
				"ItemProp": "Pat_Name", // 项目属性Code
				"SpecialValueCode": 32, // 特殊值ID
				"ClassName": "基本信息", // 接口类别名称
				"WebServiceUrl": "" // WebService地址
			}
		}
	],
	"config": { // 表单配置
		"title": "表单标题", // 表单标题
		"labelWidth": 100, // 表单组件的label宽度
		"labelPosition": "right", // 表单组件label的对齐方式
		"size": "small", // 表单组件的尺寸
		"observationConfig": { // 观测阶段配置
            "DEObservationTypeID": 4, // 观测阶段ID
            "Name": "最近一次手术名称", // 观测阶段名称
            "Code": "LastOperating", // 观测阶段code
            "TimeField": "105", // ???
            "ConditionField": "104", // ???
            "ConditionFieldType": "", // ???
            "IsCareTimeDiff": "1", // 是否关注时间差
            "DEItemPropCode": "OP_AdmTime", // ???
            "WebServiceUrl": "XH^http://localhost:57772/csp/dhc-csm/CSM.OperationDataInterface.cls",// WebService地址
            "CondCompareOp": "like", // 比较条件的比较符
            "ConditionValue": "高血压", // 比较条件值
            "TimeScopeIsBf": true, // 时间范围是否是之前
            "TimeScopeValue": "1", // 时间范围值
            "TimeScopeUnit": "d", // 时间范围单位
            "TimeScopeIsIn": true, // 时间范围是否是之内
            "TimeDiff": "1", // 提醒时间差值
            "TimeDiffUnit": "d" // 提醒时间差单位
        } 
	}
}
```

### 其他组件类型的配置参数

[点击查看widgetsConfig.js](mweblib://16126694127333)



### VUE项目使用插件示例

#### 全局使用

同表单设计组件相同

#### 组件内使用

```vue
<template>
  <div>
    <fm-generate-form></fm-generate-form>
  </div>
</template>

<script>
  import {FmGenerateForm} from '@/assets/form-make/FormMaking.umd.js'
  export default {
    name:'Demo',
    components:{FmGenerateForm},
    data () {
      return {
        
      }
    }
  }
</script>
```



### api 说明

| 参数						   | 说明		                 | 绑定方式                   | 类型	                   	|
|-----------------------------|----------------------------|-----------------------------|-----------------------------|
|has-operate-btn			|是否显示底部操作按钮							|v-bind		|Boolean	|
|json-data					|表单元数据json对象								|v-bind		|Object		|
|get-json-data				|获取表单元数据json并赋值的方法					|v-bind		|Function	|
|json-data-http-option		|获取表单元数据json并赋值方法http请求对象参数		|v-bind		|Object		|
|value						|表单数据对象									|v-bind		|Object		|
|get-value					|获取表单数据对象并赋值的方法						|v-bind		|Function	|
|value-http-option			|获取表单数据对象并赋值方法http请求对象参数		|v-bind		|Object		|
|de-settings				|外部接口配置数据								|v-bind		|Object		|
|get-de-settings			|获取外部接口配置信息的方法						|v-bind		|Function	|
|de-settings-http-option	|获取外部接口配置信息的方法http请求对象			|v-bind		|Object		|
|external-data				|外部数据对象									|v-bind		|Object		|
|get-external-data			|获取外部数据对象方法							|v-bind		|Function	|
|external-data-http-option	|获取外部数据对象方法http请求参数对象				|v-bind		|Object		|
|show-data					|点击表单预览中的【获取数据】按钮时执行的方法		|v-on		|Function	|
|field-value-change			|字段值更新触发的事件 参数依次为（key,newVal,oldVal,$vm）		|v-on		|Function	|
|upload-img	|上传图片相关配置，对象类型，uploadUrl:上传地址，baseUrl:基础路径	|v-on	|Object	|

### 实例化对象$vm中的方法
```
getData: 获取表单数据 
		@return promise类型
		
reset: 重置表单数据
```
## 源码目录说明
```bash
|-- form-making
    |-- .editorconfig // editor配置文件，配置文件格式化规则
    |-- .gitignore // git 忽略文件目录
    |-- .prettierrc // prettier配置文件
    |-- LICENSE // 开源协议
    |-- package.json  // node项目依赖
    |-- README.md // 说明文档
    |-- README.zh-CN.md // 说明文档-中文
    |-- TODO.md // todo
    |-- vue.config.js // vue项目配置文件
    |-- 插件使用说明.md
    |-- 表单元数据JSON格式说明.md
    |-- 表单渲染使用说明.md
    |-- build // vue打包配置文件
    |   |-- webpack.test.js
    |   |-- bin
    |       |-- showCoverageReporter.js
    |       |-- showUnitTestsReporter.js
    |-- demo // 插件引用demo文件
    |   |-- formrender.html // 表单渲染demo
    |   |-- index.html // 表单设计器页面demo
    |   |-- jsonData.js // 测试数据
    |-- dist // vue打包生成文件目录
    |-- doc // 暂时无用的文件
    |   |-- blank.md
    |   |-- imgupload.md
    |-- public // vue脚手架搭建时生成的静态文件目录
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- lib
    |       |-- ace // 用于格式化json数据展示html样式
    |-- src // vue源代码文件
    |   |-- App.vue // vue根组件
    |   |-- http.js // 网络请求相关
    |   |-- index.js // 打包成插件的入口文件
    |   |-- indexBundle.js // 暂时无用
    |   |-- index_bak.js // bak文件
    |   |-- main.js // 开发环境启动入口文件
    |   |-- assets // 参与打包的vue静态资源文件
    |   |-- components // vue组件
    |   |   |-- BatchAddDialog.vue // 封装的打开对话框组件
    |   |   |-- Container.vue // 整个表单设计器设计的容器（除顶部菜单栏）
    |   |   |-- FormConfig.vue // 右侧配置区域
    |   |   |-- FormMake.vue // 整个表单设计器设计组件
    |   |   |-- generateCode.js // 生成代码相关文件
    |   |   |-- Test.vue
    |   |   |-- common // 公共组件
    |   |   |   |-- CusDialog.vue // 自定义弹框
    |   |   |   |-- element-ui.js // element-ui
    |   |   |   |-- index.js // 公共组件入口
    |   |   |   |-- SelectTree.vue // 下拉选择树
    |   |   |   |-- vant-ui.js // vant-ui
    |   |   |-- generateForm // 生成表单（表单渲染）组件
    |   |   |   |-- DataPreviewDialog.vue // 元数据预览对话框
    |   |   |   |-- EventLibs.js // 绑定的函数库文件
    |   |   |   |-- GenerateForm.vue // 生成表单（表单渲染）组件
    |   |   |   |-- GenerateFormGrid.vue // grid和group组件
    |   |   |   |-- GenerateFormGridPhone.vue // grid和group组件phone
    |   |   |   |-- GenerateFormItem.vue // 单个表单组件渲染
    |   |   |   |-- GenerateFormItemPhone.vue // 单个表单组件渲染phone
    |   |   |   |-- GenerateFormPhone.vue // 生成表单（表单渲染）组件phone
    |   |   |   |-- utils.js // 工具方法
    |   |   |-- Upload
    |   |   |   |-- index.vue
    |   |   |-- widget // 设计相关组件
    |   |       |-- customWidgets.js // 常用组件
    |   |       |-- DictionaryDialog.vue // 配置字典对话框
    |   |       |-- EventConditionDialog.vue // 配置事件条件的对话框
    |   |       |-- EventConfig.vue // 事件配置页签
    |   |       |-- EventDialog.vue // 配置事件详细内容的对话框
    |   |       |-- WidgetConfig.vue // 组件配置页签
    |   |       |-- WidgetConfigLabel.vue // 组件配置项label封装，（label+？提示语）
    |   |       |-- WidgetForm.vue // 组件设计区域
    |   |       |-- WidgetFormItem.vue // 组件设计区域单个组件
    |   |       |-- WidgetGrid.vue // grid和group组件
    |   |       |-- widgetsConfig.js // 组件配置文件
    |   |-- lang
    |   |   |-- en-US.js
    |   |   |-- zh-CN.js
    |   |-- page // 页面
    |   |   |-- FormMake.vue // 表单设计页面
    |   |   |-- FormView.vue // 表单渲染页面
    |   |   |-- Manage.vue
    |   |   |-- test.json // 模拟元数据
    |   |-- router
    |   |   |-- index.js
    |   |-- styles
    |   |   |-- common.scss
    |   |   |-- cover.scss
    |   |   |-- index.scss
    |   |   |-- theme.scss
    |   |   |-- mixins
    |   |       |-- config.scss
    |   |       |-- function.scss
    |   |       |-- mixins.scss
    |   |       |-- utils.scss
    |   |-- util
    |       |-- index.js
    |       |-- request.js
    |       |-- WidgetTypeCounter.js
    |-- test
        |-- mock // mock数据
        |   |-- DESettings.js // 外部接口配置需要的数据
        |   |-- dictionaryItems.js // 字典项数据
        |   |-- dictionaryTree.js // 字典树
        |   |-- extends.js
        |   |-- externalData.js // 外部接口数据
        |   |-- index.js
        |   |-- jsonData.js
        |   |-- test.js
        |-- unit
            |-- index.js
            |-- karma.conf.js
            |-- util.js
            |-- specs
                |-- Test.spec.js

```

