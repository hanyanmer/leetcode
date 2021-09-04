leetcode 1.两数相加

[1. 两数之和 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/two-sum/)

```javascript
/**

 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
   */
   var twoSum = function(nums, target) {
   let numsMap = new Map()
   nums.map((item, index)=> {
       numsMap.set(item,index)
   })
   for(let i=0;i<nums.length;i++){
       if(numsMap.has(target-nums[i])&&(numsMap.get(target-nums[i]))!==i){
           return [i,numsMap.get(target-nums[i])]
       } 
   }
   };
```

通过map的方式，执行时间减少了很多
原因在于：顺序查找，二分查找，二叉排序树和平衡二叉树上的查找都是基于关键字比较的基础上，查找的频率依赖于查找过程中进行关键字比较的次数，这几种方法所需的比较次数下界是log2n+o(1)。所以hash查找在理想情况下不需要任何比较就可以找到待查的关键字，查找的时间复杂度是o(1),核心是减低了查找的时间复杂度。

什么是hash表：在结点的存储位置与它的关键字（对应hashmap中的key值）之间建立一个确定的函数关系，使每个关键字和一个唯一的存储位置相对应。则在查找的时候，只需要根据函数关系计算出存储位置，就可以对结点进行访问了。

什么是hash函数：结点的存储位置和关键字之间的函数关系叫做hash函数。

```
H = H(key) key:hashmap中的key值;H() hash函数 H hash地址也就是结点真正的存储位置
```

什么是hash冲突：多个key通过计算可能算到了同一个hash值也就是同一个位置了。（比如查找一万个数，可能会存在10个hash值，然后再通过链表方式查找到）

hash冲突的解决方法：链表法（拉链表）和开放地址法 。（Java中的hashmap解决冲突用的就是链表法。）

开放定址法将所有结点均存在散列表T[0...m-1],链表法是将互为同义词的结点链成一个单链表，而将此链表的头指针存入到散列表T[0...m-1],这里m是散列表的空间长度。

链表法相比较的优点：处理冲突简单；结点空间是动态申请的。

留坑：get的时候怎么计算，put的时候怎么计算，解决冲突是怎么解决的。





JavaScript中map基础用法

JavaScript中的Object本质上是键值对（hash结构），但是传统上只能用字符串作为key，有很大的限制。
ES6提供map数据类型，key值不仅限于字符串类型。

```javascript
基础的增删改查
const ma = new Map()
const o = {p:'hello world'}
map.set(o,'content')  //添加一个键值对，key是对象o，value是content
map.has(o)  //判断key是否存在
map.get(o)  //通过key获取value值，如果没有返回undefined
map.size    //获取map有多少个键值对
map.delete(o) //通过key删除一个键值对

初始化
通过什么方式创建一个Map，只要是具有iterator接口的都可以作者为map构造函数的参数
let map = new Map()

数组转换为map
const arr = [1,2]
arr.forEach(([key,value])=>map.set(key,value))  
arr.map(([key,value]=>map.set(key,value)))
map转为数组
[...map]  
map转为对象
let obj = Object.create(null)
for(let [key,value] of map){
	obj[key] = value
}
对象转为map
let map = new Map(Object.entries(obj))
//或者
for(let key of Object.keys(obj)){
	map.set(key,obj[key])
}


遍历（使用entries）
//entries
const map = new Map()
for(let item of map.entries()){
	console.log(item[0],item[1])
}
for(let [key,value] of map.entries()){
	console.log(key,value)
}
等同于上面的遍历
for(let [key,value] of map){
	console.log(key,value)
}
//keys
for(let key of map.keys()){
	console.log(key)
}
//values
for(let value of map.values()){
	console.log(value)
}

```

weakMap只接受对象作为key（null除外），不接受其他类型的值作为键名。

weakMap设计目的在于，有时我们想在某对象上存放一些数据，到那时这会形成对于这个对象的引用。但是weakMap的键名所引用的对象是弱引用，只要所引用的对象其他引用消息，这个键值对会自动消失。

