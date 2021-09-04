### 解析URL



```javascript
    function parseParam(url) {
        // 将 ? 后面的字符串取出来
        //.任意一个字符 +多个任意字符  ？字符  （.+）多个任意的字符 --这个作为返回值
        //exec(url)[0] 匹配到的是url本身   exec(url)[1] 匹配到的（）里面的内容
        const paramsStr = /.+\?(.+)$/.exec(url)[1];
        const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
        let paramsObj = {};
        // 将 params 存到对象中
        paramsArr.forEach(param => {
            if (/=/.test(param)) { // 处理有 value 的参数
                let [key, val] = param.split('='); // 分割 key 和 value
                val = decodeURIComponent(val); // 解码
                // 判断是否转为数字 \d 表示匹配一个数字字符  parseFloat(Sring) 解析一个字符串返回一个浮点数
                val = /^\d+$/.test(val) ? parseFloat(val) : val;

                if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                    paramsObj[key] = [].concat(paramsObj[key], val);
                } else { // 如果对象没有这个 key，创建 key 并设置值
                    paramsObj[key] = val;
                }
            } else { // 处理没有 value 的参数
                paramsObj[param] = true;
            }
        })

        return paramsObj;
    }
console.log(parseParam('http://localhost:8080/user?name=han&name=test&sum=12&count'))
    // {name: Array(2), sum: 12, count: true}
    // name: (2) ["han", "test"]
```



附加：

#### js对文字编码使用三个函数

escape--unescape

encodeURI--decodeURI

encodeURIComponent--decodeURIComponent

1.传递参数时使用encodURIComonent

2.url跳转时可以使用encodeURI 如：location.href = encodeURI("http://……")

location.href 设置或返回当前文档的完整的url

3.js使用数据时使用unescape

4.escape对0~255以外的编码格式%uXX，其他三种编码同

使用encodeURIComponent最多，将中文、韩文等转换成utf-8的url编码

#### parseFloat

在js中parseFloat（string） 解析字符串，把字符串转为浮点数

#### 正则

**\d 表示匹配一个数字字符**

如判断一个值是不是数字

/^\d+$/.test(val)

**() 表示匹配并记住（)里面的**

**贪婪匹配**

+匹配前一项至少出现过一次

*匹配前一项出现过0次或者多次

上面这两个都是贪婪匹配，尽可能多的匹配，如果加上一个？ 表示匹配到了就不进行匹配了

**匹配位置** ：指定位置不是实际的字符

^ 匹配输入字符串的开始位置 ，如果是[^]则表示不接受方括号中的字符 

$匹配输入字符串结束的位置

. 匹配任意一个字符

注意：要进行匹配的时候要和原来的一致，

**/…（）…/.exec(str)** 

匹配str返回结果是一个数组

index=0 对应的是源字符串，也就是str本身

index=1 是括号中分组的匹配

**//.test(str) 返回true或false**

/=/.test("name='han'") 判断是否在str里面 