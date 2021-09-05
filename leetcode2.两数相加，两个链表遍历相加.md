2.两数相加，两个链表遍历相加

[2. 两数相加 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/add-two-numbers/)

```
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let carry = 0 //保存进位
    let head = new ListNode('0')
    let rear = head
    while(l1||l2){
	    let p1 = l1==null? 0:l1.val
	    let p2 = l2==null? 0:l2.val
	    rear.next = new ListNode((p1+p2+carry)%10)
        rear = rear.next
        carry = Math.floor((p1+p2+carry)/10)
	    if(l1) l1 = l1.next
        if(l2) l2 = l2.next    
    }
    if(carry!==0){ //如果进位还有值，创建一个新的结点存储
	    rear.next = new ListNode(carry)
    }
    return head.next
};  

```

采用带有头结点的尾插法，用尾指针记录最后一个元素

```
头结点head  =new ListNode('0') 返回 head.next
```

尾插法

```
head = new ListNode()
head->next = null
rear = head
循环插入结点如下
p = new ListNode()
rear.next = p
rear = rear.next
```

头插法

```
head = new ListNode()
head->next = null
循环插入结点如下
p = new ListNode()
p->next = head->next()
head->next = p
```

链表使用场景：对线性表的长度或者规模难以估计；频繁的做插入删除操作；构建动态性较强的线性表

数组转成链表

```
function arrlist(arr){
	if(arr.length===0){
		return null
	}
	let head = {value:arr[0],next:null}
	let pnode = head //pnode保存前一个结点
	for(let i=1;i<arr.length;i++){
		let node = {value:arr[i],next:null}
		pnode.next = node //将前一个结点的next指向当前结点
		pnode = node  //将node赋值给pnode
	}
	return head
}
```

链表转为数组

```
function listArr(head){
	let res = []
	while(head){
		res.push(head.value)
		head = head.next
	}
	return res
}
```



