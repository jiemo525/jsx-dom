# jsx-dom

### 1.简单实现jsx到dom的转化。
- https://toutiao.io/posts/g4qj2t/preview
- http://efe.baidu.com/blog/the-inner-workings-of-virtual-dom/

----------------

> 概览

首先用jsx编写组件 => babel将组件转译成js => React.createElement()将组件转化成VDOM => render() 生成真实DOM

1.jsx编写组件

```js
<div className='main'>
    <h1>Hello, world!</h1>
</div>
```
2.babel将组件转译成js

- babel 是一种广泛使用的转码器，配置文件是.babelrc
- 具体可以看：http://www.ruanyifeng.com/blog/2016/01/babel.html

```js
{
"plugins": [
        [
            "transform-react-jsx",
            {
                "pragma": "React.createElement"
            }
        ]
    ]
}
```
3.React.createElement()将组件转化成VDOM

```js
const React = {
    createElement
}
function createElement( tag, attrs, ...children ) {
    attrs = attrs || {};
    return {
        tag,
        attrs,
        children
    }
}

```
4.render() 生成真实DOM

```js
function render( vnode, container ) {

    if ( typeof vnode === 'string' ) {
        let textNode = document.createTextNode( vnode );
        return container.appendChild( textNode );
    }

    const dom = document.createElement( vnode.tag );

    if ( vnode.attrs ) {
        Object.keys( vnode.attrs ).forEach( key => {
            const value = vnode.attrs[ key ];
            setAttribute( dom, key, value );
        } );
    }

    vnode.children.forEach( child => render( child, dom ) );

    return container.appendChild( dom );
}
```
5.试一下

```js
const element = (
    <div className='main'>
        <h1>Hello, world!</h1>
    </div>
);
ReactDOM.render(
    element,
    document.getElementById( 'root' )
);
```
### 运行
-----------
parcel是是一个Web应用程序打包器,它利用多核处理提供极快的性能，并且你不需要进行任何配置。具体操作参看：http://www.css88.com/doc/parcel/getting_started.html

```js
> npm install -g parcel-bundler
```

```js
> git clone https://github.com/jiemo525/jsx-dom.git
> cd jsx-dom
> npm install
> npm start
```

