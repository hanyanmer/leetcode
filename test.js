


nums,targets是数组，返回值也是数组
var twoSum=function(nums,target){
	var res[];
	//定义一个map
	var map = new Map();
	for(let i=0;i<nums.length;i++){
		map.put(nums[i],i);
	}
	for(let i=0;i<nums.length;i++){
		let anotherValue=target-nums[i];
		if(map.containsKey(anotherValue)&&map.get(anotherValue)!=i){
			res.push(i);
			res.push(map.get(anotherValue));
			break;
		}
	}
	return res;
}
var addTwoNumbers=function(l1,l2){
    let head=new ListNode('0');
    let p=head;
    let sum = 0;
    let flag = 0;
    while(l1||l2){
        sum=0;
        if(l1!=null){
            sum =sum+l1.val;
            l1=l1.next;
        }
        if(l2!=null){
            sum=sum+l2.val;
            l2=l2.next;
        }
        if(flag)
            sum=sum+1;
        p=new ListNode(sum%10);
        p=p.next;
        flag=sum>=10?1:0;
    }
    if(flag)
        p=new ListNode(1);
    return head.next;

}

开发一个模板引擎
模板引擎：模块管理AMD require.js ,CMD sea.js ,COMMONJS NODE.JS UMD
模块化：模块的定义，模块的依赖，模块的调用，模块的管理（容器管理）

定义一个立即执行函数
<script>
let module=(function(){
	//通过容器管理定义的模块
	const moduleList={};
	//模块管理：模块的添加功能（将定义好的模块通过名字将执行函数放到容器中进行管理）
	//声明模块方法
	function define(name,modules,action) {
		//对第二个参数做处理：m是模块的名字，i是数组的下标
		modules.map((m,i)==>{
			//根据名字拿出依赖的模块，然后放入到
			modules[i]=moduleList[m];
		})
		//将模块通过名字放入容器中进行管理,最终放入容器中的是模块执行的结果放
		moduleList[name]=action.apply(null,modules);
	}
	//返回模块
	return{define}
})()
//定义模块方法:三个参数->模块的名字，模块依赖的模块，模块执行的方法（也就是function函数，同时将这个结果放入到了容器中进行管理）
//调用声明模块方法，这时候也就是将马上定义好的模块放入到容器中进行管理，
//定义了一个名字为study模块，这个模块的功能为取数组最大值和第一个值
modules.define('study',[],function () {
	//定义当前这个模块提供了哪些功能，
	//向外面暴露一些功能，所以叫导出  只有在初始化的时候也就是将模块放入到容器中执行这个模块，后续不执行了
	return{
		first(arr){
			return[0];
		}
	}
	return
		max(arr,key){//传入参数一个数组，一个按照什么取值
			return arr.sort((a,b)==>b[key]-a[key])[0];
		}
	}

});
//再定义一个名字为math的模块，这个模块依赖study这个模块，
modules.define('math',['study'],function(study) {
	//没有向外面暴露一些功能，所以叫导入
	//可以直接使用传入进来的依赖模块里的函数等
	// console.log(study);
	let data=[
	{name:'js',price:199},{name:'mysql',price:58}]
	//调用study模块，然后按照价格查找最大值
	study.max(data,price);
	//打印出来看看
	console.log(study.max(data,price));

	
});
</script>
知识点总结：
1.立即执行函数，不需要调用和声明可以直接执行
2.Array的map()方法：返回一个新的数组，数组中的数据为处理后的值
arr.map(function(currentValue,index,arr)) index和arr可选


模块的基本使用
study.html
<html>
	<head>
	</head>
	<body>
		<script type="module"> //必须加上type="module"不然会报错
			//使用模块提供的功能
			import{ title，show } from "./math.js"	
			show();//访问show方法
			console.log(tile);	
		</script>
	</body>
</html>

math.js
//定义两个变量，并且通过export开放功能和变量 也就是其他的js可以访问
let title='';
let url='';
function show(){

}
export{
	title,show
}
总结：
1.在模块里不导出export的时候，方法和变量是私有的，外部不能访问和使用
原则上：导出少量的变量和方法供外部使用
2.使用模块中的功能时候，要使用导入import 指明导入的 功能和路径，同时指定type="module"

模块延迟解析与严格模式
study.html
<html>
	<head>
	</head>
	<body>
		// <script> 不能执行，因为button在下面还没加载进来
		// 	 $(document).getElementByTag()
		// </script>
		// <script type="module">  
		// 	import {} from "./math.js"; //可以执行因为模块加载不是先后顺序执行，而是所有的模块都加载进来然后才解析执行
		// </script>

		<script>
			site='hai'; //不会报错
		</script>
		<script>
			"use strict";//使用严格模式
			site='hai'; //会报错，必须先声明后使用
		</script>
		<script type="module">//当使用模块的时候默认的是严格模式 
			site='hai';//会报错，必须先声明后使用
		</script>
		<button>按钮</button>
	</body>
</html>

math.js
$(document).getElementByTag()
总结：
1.模块延迟：就是所有的模块加载完成后解析
2.使用严格模式更加稳定

模块的作用域
<html>
	<head>
	</head>
	<body>
		<script>
			let url='hai'; //定义的变量作用域是顶级作用域
		</script>
		<script type="module"> 
			let title='你好';//模块有自己独立的作用域
		</script>
		
		<script type="module">
			console.log(title);//访问不到,因为上面的title是模块里面定义的，
			console.log(url);//可以访问到
		</script>
	</body>
</html>
总结：
1.模块有他自己独立的作用域，如果想使用只能导出才能使用
2.顶级作用域都可以获取到
3.这两个函数的变量不能相互访问
function f(){
	let i ='';
}
function m(){
	let j='';
}

模块的预解析
<html>
	<head>
	</head>
	<body>
		<script type="module">  
			import {} from "./math.js";
			import {} from "./math.js";
			import {} from "./math.js";//无论加载多少次，结果只有一条 hai

			import {obj } from "./study.js";
			console.log(obj.get());//调用
		</script>
	</body>
</html>
math.js
console("hai")
study.js
class Lesson{
	data=[];
	init(){
		this.data=[{name:"js"},{name:"vue.js"}];//对数据的初始化，使用模块只加载一次的好处，不用每一次调用都加载一次
	}
	get(){
		return this.data;
	}
}
let obj = new Lesson();
obj.init();
export{ obj };
总结：
1.模块无论加载多少次，只会在第一次（也就是放到容器中管理那会）才执行


导出的写法及别名
导出1： 
export var title;
export function get() {
	
}
导出2：
var title;
function get(argument) {
	
}
export { title; get} 
这两个导出的写法虽然不同，但是功能是一样的，推荐后者写法
导出别名：export {hahahahahh as title} 使用的时候使用as后面的名称
导入模块别名使用：import {title as a } from "./study.js"
批量导入-->不推荐使用
import * as api from "./study.js"  //在访问之前加入api
默认导出和导入的写法
study.js
export var title='tile';
export default class User{
	static render(){
		return "User static render";
	}
}
或者这样写：export {User as default,title};
study.html
import User from "./study.js"
总结：
1.{} 表示导入多个方法或变量的时候使用，默认导出的时候，也就是只有一个可以不使用{}，此时默认导出的名字User也可以是其他的单词，可以是任意的
2.当在js中有多个导出的时候，可以写两个import语句，也可以这样写
import User ,{title} from "./study.js";
import * as api from "./study.js"
当导出的时候，有默认导出和其他的导出的时候，导入使用* as 的时候 注意
调用默认的这样使用：api.default.render();

合并导出
将所有的导入都合并到一个文件里，然后给出一个统一的导出，
merge.js
import add as m1 from "/m1.js"; //进行模块的划分，是为了避免变量的冲突，比如m1,m2里面都有url的话，使用模块就可以使用
import dele as m2 from "./m2.js";
export{m1,m2};

使用：将合并后的导出作为入口就可以了
impact * as api from "./merge.js";
console.log(api.m1.default.show())//打印模块1下面的默认方法show

import {} from "./study.js" //这样导入语句必须写在<script>标签中的顶层,是静态加载方式
而import方法不需要放再顶层，
按需动态加载模块
import().then(function f(argument) {
	//使用import这个方法，返回的是一个promise对象
	//理解then：当我的import()这个方法成功加载后就执行后面的f这个方法
})


import("./module.js").then(module==>{
	console.log(module)
}) 

//因为module是一个对象，那么可以使用展开语法，把字段拿出来
import("./module.js").then(({site,url})==>{
	console.log(site,url);
})
总结：当点击什么然后执行之后才加载这个方法时候使用

这些模块管理都是js的新增语法，在老旧的浏览器中不能正确的使用的，需要一些工具转为es5的语法然后才能使用。使用webpack。
通过什么转呢？安装node.js 然后就可以使用npm 这个命令了
1.生成配置文件
npm init -y  //这时候就生成了package.json 这个配置文件
2.安装webpack工具
npm i webpack webpack-cli --save-dev
3.修改package.json文件
增加一个在
"scripts":{
	"dev":"webpack --mode development --watch"
}
4.在项目里添加一个打包目录，文件夹dist 用来存放编译好的文件存放的位置

5.创建一个src文件夹
里面创建index.js(入口文件)   style.js
6.使用npm run dev 编译和打包 可以去dist目录下查看是否编译好
7.在html文件中或者js文件中就可以调用我们编译和打包好的js文件了

