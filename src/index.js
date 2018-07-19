const React = {
    createElement
}
//当多次调用render函数时，先清除原来的内容。
const ReactDOM = {
    render: ( vnode, container ) => {
        container.innerHTML = '';
        return render( vnode, container );
    }
}

function createElement( tag, attrs, ...children ) {
    attrs = attrs || {};
    return {
        tag,
        attrs,
        children
    }
}

function render( vnode, container ) {

    //如果元素为字符串则直接返回文本
    if ( typeof vnode === 'string' ) {
        let textNode = document.createTextNode( vnode );
        return container.appendChild( textNode );
    }
    //反之 先将转化为虚拟DOM
    const dom = document.createElement( vnode.tag );

    //如果存在属性 设置属性
    if ( vnode.attrs ) {
        Object.keys( vnode.attrs ).forEach( key => {
            const value = vnode.attrs[ key ];
            setAttribute( dom, key, value );
        } );
    }

    vnode.children.forEach( child => render( child, dom ) );

    return container.appendChild( dom );
}

function setAttribute( dom, name, value ) {
    // 如果属性名是className，则改回class
    if ( name === 'className' ) name = 'class';

    // 如果属性名是onXXX，则是一个时间监听方法
    if ( /on\w+/.test( name ) ) {
        name = name.toLowerCase();
        dom[ name ] = value || '';
    // 如果属性名是style，则更新style对象
    } else if ( name === 'style' ) {
        if ( !value || typeof value === 'string' ) {
            dom.style.cssText = value || '';
        } else if ( value && typeof value === 'object' ) {
            for ( let name in value ) {
                // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
                dom.style[ name ] = typeof value[ name ] === 'number' ? value[ name ] + 'px' : value[ name ];
            }
        }
    // 普通属性则直接更新属性
    } else {
        if ( name in dom ) {
            dom[ name ] = value || '';
        }
        if ( value ) {
            dom.setAttribute( name, value );
        } else {
            dom.removeAttribute( name, value );
        }
    }
}

const element = (
    <div className='main'>
        <h1>Hello, world!</h1>
    </div>
);
ReactDOM.render(
    element,
    document.getElementById( 'root' )
);