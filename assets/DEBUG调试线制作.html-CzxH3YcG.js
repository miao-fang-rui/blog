import{_ as d,c as n,a as t,e as B,b as E,f as i,r as o,o as r}from"./app-CY64WamS.js";const a={};function p(s,e){const l=o("ElImageI18n");return r(),n("div",null,[e[1]||(e[1]=t("h1",{id:"debug调试线制作",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#debug调试线制作"},[t("span",null,[t("strong",null,"DEBUG调试线制作")])])],-1)),e[2]||(e[2]=t("h2",{id:"_1、debug口定义",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1、debug口定义"},[t("span",null,[t("strong",null,"1、DEBUG口定义")])])],-1)),t("p",null,[E(l,{src:"/blog//articles/DEBUG%E8%B0%83%E8%AF%95%E7%BA%BF%E5%88%B6%E4%BD%9C/%E8%BD%A6%E8%BD%BD%E6%9C%BAdebug%E6%8E%A5%E5%8F%A3.png",alt:"车载机debug接口.png",title:"车载机debug接口.png",width:"100%",height:"100%"})]),e[3]||(e[3]=B('<table><tbody><tr><td rowspan="4" style="width:20%;"><p style="text-align:center;">DEBUG调试口</p></td><td> 1脚 </td><td> 串口RXD（收） </td></tr><tr><td style="width:40%;"> 2脚 </td><td style="width:40%;"> 空 </td></tr><tr><td> 3脚 </td><td> 串口TXD（发） </td></tr><tr><td> 4脚 </td><td> 地 </td></tr></tbody></table><h2 id="_2、转接线制作" tabindex="-1"><a class="header-anchor" href="#_2、转接线制作"><span><strong>2、转接线制作</strong></span></a></h2>',2)),t("p",null,[E(l,{src:"/blog//articles/DEBUG%E8%B0%83%E8%AF%95%E7%BA%BF%E5%88%B6%E4%BD%9C/RS232%E4%B8%B2%E5%8F%A3%E5%AE%9A%E4%B9%89.png",alt:"RS232串口定义.png",title:"RS232串口定义.png",width:"100%",height:"100%"})]),t("p",null,[E(l,{src:"/blog//articles/DEBUG%E8%B0%83%E8%AF%95%E7%BA%BF%E5%88%B6%E4%BD%9C/RS232%E4%B8%B2%E5%8F%A3%E5%AE%9A%E4%B9%892.png",alt:"RS232串口定义2.png",title:"RS232串口定义2.png",width:"100%",height:"100%"})]),e[4]||(e[4]=B('<p>DB9接口主要用到的是<code>2、3、5</code>引脚。其中：</p><ul><li><p><code>2</code>脚为RXD（接收数据）</p></li><li><p><code>3</code>脚为TXD（发送数据）</p></li><li><p><code>5</code>脚为GND（信号地线）</p></li></ul><p>接线定义：</p><ul><li><p>DB9的 <code>5</code> 脚连接到DEBUG的接口对应四芯接插件的 <code>4</code> 脚；</p></li><li><p>DB9的 <code>2</code> 脚连接到DEBUG的接口对应四芯接插件的 <code>3</code> 脚；</p></li><li><p>DB9的 <code>3</code> 脚连接到DEBUG的接口对应四芯接插件的 <code>1</code> 脚；</p></li></ul><h2 id="_3、串口线测试" tabindex="-1"><a class="header-anchor" href="#_3、串口线测试"><span><strong>3、串口线测试</strong></span></a></h2><p>把做好的串口转接线、电脑上的串口和车载机的DEBUG接口连接起来，打开串口软件进行设置，例如：<code>MobaXterm.exe</code>（<code>XSHELL</code>也可以）。</p>',6)),t("p",null,[e[0]||(e[0]=i(".")),E(l,{src:"/blog//articles/DEBUG%E8%B0%83%E8%AF%95%E7%BA%BF%E5%88%B6%E4%BD%9C/MobaXterm.png",alt:"MobaXterm.png",title:"MobaXterm.png",width:"300px",height:"100%"})]),t("p",null,[E(l,{src:"/blog//articles/DEBUG%E8%B0%83%E8%AF%95%E7%BA%BF%E5%88%B6%E4%BD%9C/%E4%B8%B2%E5%8F%A3%E6%95%B0%E6%8D%AE%E8%BD%AF%E4%BB%B6%E8%AE%BE%E7%BD%AE.png",alt:"串口数据软件设置.png",title:"串口数据软件设置.png",width:"100%",height:"100%"})]),t("p",null,[E(l,{src:"/blog//articles/DEBUG%E8%B0%83%E8%AF%95%E7%BA%BF%E5%88%B6%E4%BD%9C/%E4%B8%B2%E5%8F%A3%E6%95%B0%E6%8D%AE.png",alt:"串口数据.png",title:"串口数据.png",width:"100%",height:"100%"})]),e[5]||(e[5]=t("p",null,"有打印输出说明制作的串口转接线是正常的。",-1)),e[6]||(e[6]=t("p",null,"注意：如果设备上电后，没有用日志打印输出，可以检查一下是不是转接线的接收与发送是不是接反了，可以反过来接再测试一下。",-1))])}const D=d(a,[["render",p],["__file","DEBUG调试线制作.html.vue"]]),c=JSON.parse('{"path":"/zh/article/%E8%BD%A6%E8%BD%BD%E8%B0%83%E5%BA%A6/%E8%BD%A6%E8%BD%BD%E6%9C%BA%E9%80%9A%E7%94%A8%E6%96%87%E6%A1%A3/DEBUG%E8%B0%83%E8%AF%95%E7%BA%BF%E5%88%B6%E4%BD%9C.html","title":"DEBUG调试线制作","lang":"zh-CN","frontmatter":{"sidebar":"heading","prev":{"text":"","link":""},"next":{"text":"","link":""}},"headers":[{"level":2,"title":"1、DEBUG口定义","slug":"_1、debug口定义","link":"#_1、debug口定义","children":[]},{"level":2,"title":"2、转接线制作","slug":"_2、转接线制作","link":"#_2、转接线制作","children":[]},{"level":2,"title":"3、串口线测试","slug":"_3、串口线测试","link":"#_3、串口线测试","children":[]}],"git":{"updatedTime":1736746789000,"contributors":[{"name":"miao-fang-rui","email":"miaofangrui@163.com","commits":1}]},"filePathRelative":"zh/article/车载调度/车载机通用文档/DEBUG调试线制作.md"}');export{D as comp,c as data};
