$(function () {
    count = 1;
    lastActive = 0;
    //list列表,第一个是顶栏和下栏图标,第二个是底栏颜色,第三个是背景色,接下来每个都是一个组件的颜色
    $('#topNavi')[0].style = "height: 42px;width: 100%;background: #090;display: flex;flex-direction: row;align-items: center;align-self: flex-start; ";
    $('#navi_back')[0].style = "width: 24px; height: 24px;";
    $('#navi_title_text')[0].style = "text-align: center;width: 80%;margin: 0 0 0 5px; ";
    $('#navi_set')[0].style = "width:20px;height: 20px;margin: 0 8px;";
    $('#bottomNavi')[0].style = "align-self: flex-end;height: 40px;width: 100%;background: #090;position: absolute;display: flex;flex-direction: row;align-items: center;"
    $('#design-frame')[0].style = "width: 279px;height: 462px;background: #fff;position: relative;display: flex;z-index: 2;"
    $('div#bottomNavi_Icon')[0].style = $('div#bottomNavi_Icon')[1].style = $('div#bottomNavi_Icon')[2].style = "width: 33%;align-items: center;text-align: center;"
    $('div#bottomNavi_Icon>img')[0].style = $('#bottomNavi_Icon>img')[1].style = "width: 20px;height: 20px;"
    $('#circle-container')[0].style = "width: 80px;height: 80px;border-radius: 50%;background: #f6f6f6;box-shadow: 2px 2px 2px #888;"
    $('#squares-container')[0].style = "width: 80px;height: 80px;background: #f6f6f6;box-shadow: 2px 2px 2px #888;"
    $('#round-squares-container')[0].style = "width: 80px;height: 80px;border-radius: 5px;background: #f6f6f6;box-shadow: 2px 2px 2px #888;"
    $('#circle-container-noshadow')[0].style = "width: 80px;height: 80px;border-radius: 50%;background: #f6f6f6;"
    $('#squares-container-noshadow')[0].style = "width: 80px;height: 80px;background: #f6f6f6;"
    $('#round-squares-container-noshadow')[0].style = "width: 80px;height: 80px;border-radius: 5px;background: #f6f6f6;"





    //随机生成列表
    updatelist = async function () {
        for (var k = 0; k < 10; k++) {
            list = [];
            //此处大改
            var topColor = 2;
            var backColor = 0;
            var bottomColor = 1;
            list.push(topColor);
            list.push(bottomColor);
            list.push(backColor);
            for (var i = 1; i < count; i++) {
                if ($('#' + i).length == 0) {
                    list.push(0);
                    continue;
                }
                var father_div = $('#' + i)[0];
                var child_div = father_div.children[0];
                if (child_div.tagName == "P") {
                    list.push(4);
                }
                else if (child_div.tagName == "DIV") {
                    list.push(getRandomInt(2) + 2);
                } else if (child_div.tagName == "svg") {
                    list.push(2);
                } else
                    list.push(getRandomInt(5));
            }
            for (let i = 0; i < list.length; i++)
                list[i] = 4 - list[i];
            updateColor(list);
            canvas = document.getElementById("canvas");
            await rasterizeHTML.drawHTML(document.getElementById('design-area').innerHTML,
                canvas);
            palette = [];
            for (var i = 0; i < 5; i++) {
                var RGBvalue = hexToRgb(colorVec[i]);
                palette.push([RGBvalue.r, RGBvalue.g, RGBvalue.b]);
            }
            adjacency = colorgraph.get_connectivity_matrix(palette, canvas, true);
            //console.log(adjacency);
        }
        return ElementList;
    }

    lock = [false, false, false, false, false];

    //模型是否载入
    loaded = false;

    listeners();

    //component可拖动
    for (var i = 0; i < $('.component').length; i++) {
        $('.component')[i].draggable = true;
    }

    for (var i = 0; i < $('.component_icon').length; i++) {
        $('.component_icon')[i].draggable = true;
    }


    $('.component').draggable({
        cursor: 'move',
        opacity: 0.7,
        helper: 'clone',
        cursorAt: { top: 100, left: 0 },
        stack: '.component'
    });

    updateColor = function (colorVec, ElementList) {
        $('#topNavi')[0].style.background = colorVec[ElementList[0]];
        $('#bottomNavi_Icon>svg')[0].style.fill = colorVec[ElementList[0]];
        $('#bottomNavi')[0].style.backgroundColor = colorVec[ElementList[1]];
        $('#design-frame')[0].style.backgroundColor = colorVec[ElementList[2]];
        for (var i = 1; i < count; i++) {
            if ($('#' + i).length == 0) {
                continue;
            }
            var fath_div = $('#' + i)[0];
            var child_div = fath_div.children[0];
            if (child_div.tagName == "BUTTON") {
                child_div.style.backgroundColor = colorVec[ElementList[i + 2]];
            } else if (child_div.tagName == "DIV") {
                child_div.style.backgroundColor = colorVec[ElementList[i + 2]];
            } else if (child_div.tagName == "P") {
                child_div.style.color = colorVec[ElementList[i + 2]];
            } else if (child_div.tagName == "svg") {
                child_div.style.fill = colorVec[ElementList[i + 2]];
            }
        }
    };

    enableElement = function (event) {
        event.stopPropagation();
        if (lastActive == this.id) {
            if (this.children[0].tagName == 'P') {
                this.children[1].style.display = "block";
                this.children[0].style.display = "none";
                this.children[1].value = this.children[0].innerHTML;
            }
            return;
        } else if (lastActive > 0) {
            disableElement();
        }
        lastActive = this.id;
        this.style.border = '1px dashed gray';
        let deleteButton = document.createElement('div');
        deleteButton.id = "deleteButton";
        deleteButton.innerHTML = "<img src='./images/del.svg' />";
        deleteButton.style = "position:float";
        this.appendChild(deleteButton);
        deleteButton.onclick = function () {
            $(this)[0].parentElement.style.display = "none";
        }
        let changeButton = document.createElement('div');
        changeButton.id = "changeButton";
        // changeButton.innerHTML = "<img src='../images/edit.svg' />";
        this.appendChild(changeButton);
        $('#' + this.id + '>#changeButton').paigusu({}, function (event, obj) {
            let father_div = this.eve.parentElement;
            let child_div = father_div.children[0];
            if (child_div.tagName == "DIV") {
                child_div.style.backgroundColor = '#' + obj.hex;
            } else if (child_div.tagName == "P") {
                child_div.style.color = '#' + obj.hex;
                father_div.children[0].style.display = "block";
                father_div.children[1].style.display = "none";
                father_div.children[0].innerHTML = father_div.children[1].value;
            } else if (child_div.tagName == "svg") {
                child_div.style.fill = '#' + obj.hex;
            }
        });
        $(this).resizable({
            disabled: false,
            alsoResize: "#" + this.id + ">#also",
            containment: '#design-frame',
            handles: 'e,w,s,n,se'
        });
        $(this).draggable({
            disabled: false,
            containment: '#design-frame'
        });
        if (this.children[0].tagName == 'P') {
            this.children[1].value = this.children[0].innerHTML;
            let TextUp = document.createElement('div');
            TextUp.id = "TextUp";
            // TextUp.innerHTML = "增大";
            this.appendChild(TextUp);
            TextUp.onclick = function (event) {
                event.stopPropagation();
                let father_div = this.parentElement;
                let child_div = father_div.children[0];
                father_div.children[0].style.display = "block";
                father_div.children[1].style.display = "none";
                father_div.children[0].innerHTML = father_div.children[1].value;
                child_div.style.fontSize = (parseInt(child_div.style.fontSize.slice(0, -2)) + 2) + "px";
            }
            let TextDown = document.createElement('div');
            TextDown.id = "TextDown";
            // TextDown.innerHTML = "减小";
            this.appendChild(TextDown);
            TextDown.onclick = function (event) {
                event.stopPropagation();
                let father_div = this.parentElement;
                let child_div = father_div.children[0];
                father_div.children[0].style.display = "block";
                father_div.children[1].style.display = "none";
                father_div.children[0].innerHTML = father_div.children[1].value;
                child_div.style.fontSize = (parseInt(child_div.style.fontSize.slice(0, -2)) - 2) + "px";
            }
        }
    };

    $('#design-frame').click(function (event) {
        disableElement();
        lastActive = -1;
    });

    disableElement = function (event) {
        if (lastActive > 0) {
            let father_div = $('#' + lastActive)[0];
            let child_div = father_div.children[0];
            $('#' + lastActive).resizable('destroy');
            $('#' + lastActive).draggable('destroy');
            father_div.style.border = '1px solid transparent';
            father_div.removeChild($('#' + lastActive + '>#deleteButton')[0]);
            father_div.removeChild($('#' + lastActive + '>#changeButton')[0]);
            if (father_div.children[0].tagName == 'P') {
                father_div.children[0].style.display = "block";
                father_div.children[1].style.display = "none";
                father_div.children[0].innerHTML = father_div.children[1].value;
                father_div.removeChild($('#' + lastActive + '>#TextUp')[0]);
                father_div.removeChild($('#' + lastActive + '>#TextDown')[0]);
            }
        }
    }

    //已有组件
    for (; ; count++) {
        if ($('#' + count).length == 0) {
            break;
        } else {
            var father_div = $('#' + count)[0];
            var child_div = father_div.children[0];
            child_div.id = "also";
            father_div.onclick = enableElement;
        }
    }

    // 调色板
    for (let i = 0; i < 5; i++) {
        $('#paigusuEdit' + i).paigusu(
            {
                // color : '#1926dc',//初始色
            },
            function (event, obj) {
                $('#paigusu' + i).css('background-color', '#' + obj.hex);
                $('#paigusu' + i)[0].title = '#' + obj.hex;
                let beginPalette = getPalette(0);
                updateColor(colorListToPalette(beginPalette), list);
            }
        );
    }

    let beginPalette = getPalette(0);
    updateColor(colorListToPalette(beginPalette), list);

});

function hanleChangeComponentsType(theId) {
    var componentType = document.getElementById(theId).value;
    switch (componentType) {
        case "Basic":
            document.getElementById('component-basic').style = "display: block";
            document.getElementById('component-container').style = "display: none";
            document.getElementById('component-icon').style = "display: none";
            document.getElementById('component-navigation').style = "display: none";
            break;
        case "Container":
            document.getElementById('component-basic').style = "display: none";
            document.getElementById('component-container').style = "display: block";
            document.getElementById('component-icon').style = "display: none";
            document.getElementById('component-navigation').style = "display: none";
            break;
        case "Icon":
            document.getElementById('component-basic').style = "display: none";
            document.getElementById('component-container').style = "display: none";
            document.getElementById('component-icon').style = "display: block";
            document.getElementById('component-navigation').style = "display: none";
            break;
        default:  // Navigation
            document.getElementById('component-basic').style = "display: none";
            document.getElementById('component-container').style = "display: none";
            document.getElementById('component-icon').style = "display: none";
            document.getElementById('component-navigation').style = "display: block";
            break;
    }
}