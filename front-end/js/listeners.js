function changeArrow(_this) {
    var img = $(_this).children('img');
    var isDown = $(img).attr('data-id');
    // console.log(isDown);
    if (isDown == 0) {
        $(img).attr('src', './images/arrow-down.png');
        $(img).attr('data-id', 1);
    } else {
        $(img).attr('src', './images/arrow-right.png');
        $(img).attr('data-id', 0);
    }
}


listeners = function () {
    $('div #navi_title_text').click(function () {
        var text = $('#navi_title_text')[0];
        var input = $('div #navi_title_input')[0];
        input.style.display = "block";
        input.focus();
        text.style.display = "none";
        input.value = text.innerHTML;
    })

    $('div #navi_title_input').mouseout(function () {
        var text = $('#navi_title_text')[0];
        var input = $('div #navi_title_input')[0];
        input.style.display = "none";
        text.style.display = "block";
        text.innerHTML = input.value;
    })

    topNavShow = true;
    $('div#topNavi')[0].hidden = "";
    bottomNavShow = true;
    $('div#bottomNavi')[0].hidden = "";
    $('#topNav')[0].checked = true;
    $('#bottomNav')[0].checked = true;

    $('#topNav').change(function () {
        if (topNavShow) {
            topNavShow = false;
            $('div#topNavi')[0].style.display = "none";
        } else {
            topNavShow = true;
            $('div#topNavi')[0].style.display = "flex";
        }
    })

    $('#bottomNav').change(function () {
        // console.log(11111)
        if (bottomNavShow) {
            bottomNavShow = false;
            $('div#bottomNavi')[0].style.display = "none";
        } else {
            bottomNavShow = true;
            $('div#bottomNavi')[0].style.display = "flex";
        }
    })


    let fromImage = [];
    let fromImageIndex = 0;
    chooseFromColor = function () {
        let palette = colorListToPalette(fromImage[fromImageIndex]);
        setPalette(palette, 2);
        updateColor(palette, list);
        fromImageIndex = (fromImageIndex + 1) % fromImage.length;
    }

    //上传图片API
    $("#choosePicture").change(function () {
        var file = $('#choosePicture')[0].files[0];
        console.log(file)
        $('#choosePicture')[0].disabled = true;
        $('#generate-picture-colors')[0].disabled = true;
        r = new FileReader();
        r.onload = function () {
            var str = r.result;
            str = str.slice(str.lastIndexOf(',') + 1, str.length);
            xmlhttp = new XMLHttpRequest();
            var a = new Object;
            a.pic = str;
            xmlhttp.open("POST", "http://120.79.128.170:8001/app/extract_palettes", true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.onreadystatechange = function () {
                $('#choosePicture')[0].disabled = false;
                $('#generate-picture-colors')[0].disabled = false;
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var temp = JSON.parse(xmlhttp.responseText);
                    fromImage = [];
                    for (var i = 0; i < temp.palettes.length; i++) {
                        fromImage.push(temp.palettes[i]);
                    }
                    chooseFromColor();
                } else {
                    console.log("ERROR");
                }
            }
            xmlhttp.send(JSON.stringify(a));
        }
        r.readAsDataURL(file);    //Base64
    });

    //切换图片中颜色
    $('#generate-picture-colors').click(function () {
        chooseFromColor();
    });

    //风格生成API
    $('#style-generate').click(async function () {
        $('#style-generate')[0].disabled = true;
        a = new Object;
        a.palettes = [];
        xmlhttp = new XMLHttpRequest();

        switch ($('#choose-style-select')[0].value) {
            case "可爱风":
                a.style = "cute";
                for (let i = 0; i < 10; i++) {
                    a.palettes.push(await generateForStyle("cute"));
                }
                break;
            case "科技感":
                a.style = "technology";
                for (let i = 0; i < 10; i++) {
                    a.palettes.push(await generateForStyle("tech"));
                }
                break;
            case "小清新":
                a.style = "fresh";
                for (let i = 0; i < 10; i++) {
                    a.palettes.push(await generateForStyle("fresh"));
                }
        }
        // console.log(a.palettes);
        for (let i = 0; i < 10; i++) {
            let tempList = [];
            for (let j = 0; j < 5; j++) {
                let color = hexToRgb(a.palettes[i][j]);
                tempList.push(color.r, color.g, color.b);
            }
            a.palettes[i] = tempList;
        }

        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://120.79.128.170:8001/app/check_style", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.onreadystatechange = function () {
            $('#style-generate')[0].disabled = false;
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var a = JSON.parse(xmlhttp.responseText);
                let colorVec = [];
                for (let i = 0; i < 5; i++) {
                    colorVec.push(rgbToHex(a.palette[3 * i], a.palette[3 * i + 1], a.palette[3 * i + 2]));
                }
                updateColor(colorVec, list);
                setPalette(colorVec, 1);
            }
        }
        xmlhttp.send(JSON.stringify(a));
        // console.log(JSON.stringify(a))
    });

    $(document).keyup(function (event) {
        console.log('keyup+' + event.keyCode);
        if (event.keyCode == 46);
    })

    //落下API
    $('#design-frame').droppable({
        accept: '.component,.component_icon',
        drop: function (event, ui) {
            var src = ui.draggable[0];
            var dst = document.createElement('div');
            dst.innerHTML = src.innerHTML;
            var Rid = count++;
            dst.id = Rid;
            this.appendChild(dst);
            var father_div = dst;
            var child_div = dst.children[0];
            child_div.id = "also";
            dst.style.position = 'absolute';
            dst.style.top =
                event.clientY - $('#design-frame')[0].offsetTop + window.pageYOffset + 'px';
            dst.style.left =
                event.clientX - $('#design-frame')[0].offsetLeft + 'px';
            let temp_num = 0;
            switch (child_div.tagName) {
                case "P":
                    if (Math.random() > 0.75) temp_num = 0;
                    else temp_num = -1;
                    if (list.length > Rid + 2) { list[Rid + 2] = temp_num; }
                    else list.push(-1);
                    break;
                case "SVG":
                    if (Math.random() > 0.75) temp_num = 1;
                    else if (Math.random() < 0.25) temp_num = 3;
                    else temp_num = 2;
                    if (list.length > Rid + 2) list[Rid + 2] = temp_num;
                    else list.push(temp_num);
                    break;
                default:
                    if (Math.random() > 0.5) temp_num = 1;
                    else temp_num = 3;
                    if (list.length > Rid + 2) list[Rid + 2] = temp_num;
                    else list.push(temp_num);
                    break;
            }
            dst.style.border = '1px solid transparent';
            dst.onclick = enableElement;
        }
    });

    $('#btn-generate').click(async function () {
        $('#btn-generate')[0].disabled = true;
        let colorVec = getPalette(0);
        colorVec = await generateFromArray(colorVec, lock);
        // updatelist();
        updateColor(colorVec, list);
        setPalette(colorVec, 0);
    });

    //颜色是否被锁
    $('.lock').click(function () {
        if (lock[parseInt(this.dataset['id'], 10)]) {
            lock[parseInt(this.dataset['id'], 10)] = false;
            this.style.backgroundImage = 'url("./images/unlock.svg")';
        } else {
            lock[parseInt(this.dataset['id'], 10)] = true;
            this.style.backgroundImage = 'url("./images/lock_fill.svg")';
        }
    });

}