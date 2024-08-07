function initTree(t) {
    var tree = document.getElementById(t); // 生成树
    var lis = tree.getElementsByTagName("ul"); // 所有子菜单

    for (var i = 0; i < lis.length; i++) {
        lis[i].style.display = "none"; // 设置样式为隐藏形式，不显示
        var ps = lis[i].getElementsByTagName("p"); // 子菜单的标题
        for (var j = 0; j < ps.length; j++) {
            ps[j].onclick = function() {
                openTag(this, this.nextElementSibling);
            }
        }
    }
}

function openTag(p, ul) {
    if (ul && ul.style.display === "block") { // 点击一些展开，再点击一下折叠
        ul.style.display = "none";
    } else if (ul) {
        ul.style.display = "block";
    }
}

window.onload = function() {
    initTree("toc");
}