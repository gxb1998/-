function fn() {
    // 获取设备的宽,保存到变量 screen_w
    var screen_w = document.body.clientWidth || document.documentElement.clientWidth;

    // 设计稿的宽 ,保存到 desw
    var desw = 375;

    var rate = screen_w / desw;

    // 设置html的字体大小
    document.documentElement.style.fontSize = rate * 100 + "px";
}
fn();

// 时刻的去监听 屏幕的改变 
window.addEventListener("resize", fn);