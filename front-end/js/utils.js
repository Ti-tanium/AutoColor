function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
        : null;
}

function rgbToHex(r, g, b) {
    // var rgb = color.split(',');
    // var r = parseInt(rgb[0].split('(')[1]);
    // var g = parseInt(rgb[1]);
    // var b = parseInt(rgb[2].split(')')[0]);

    var hex =
        '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

function rgbToHsv(arr) {
    var h = 0, s = 0, v = 0;
    var r = arr[0], g = arr[1], b = arr[2];
    arr.sort(function (a, b) {
        return a - b;
    })
    var max = arr[2]
    var min = arr[0];
    v = max / 255;
    if (max === 0) {
        s = 0;
    } else {
        s = 1 - (min / max);
    }
    if (max === min) {
        h = 0;//事实上，max===min的时候，h无论为多少都无所谓
    } else if (max === r && g >= b) {
        h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
        h = 60 * ((g - b) / (max - min)) + 360
    } else if (max === g) {
        h = 60 * ((b - r) / (max - min)) + 120
    } else if (max === b) {
        h = 60 * ((r - g) / (max - min)) + 240
    }
    h = parseInt(h);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h, s, v]
}

function hsvToRgb(arr) {
    var h = arr[0], s = arr[1], v = arr[2];
    s = s / 100;
    v = v / 100;
    var r = 0, g = 0, b = 0;
    var i = parseInt((h / 60) % 6);
    var f = h / 60 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    switch (i) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
        default:
            break;
    }
    r = parseInt(r * 255.0)
    g = parseInt(g * 255.0)
    b = parseInt(b * 255.0)
    return [r, g, b];
}

getRandomInt = function (max) {
    return Math.floor(Math.random() * (max));
}


divideConst = function (list1, num) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++)
        list[i] /= num;
    return list;
}

plusConst = function (list1, num) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++)
        list[i] += num;
    return list;
}

minusConst = function (list1, num) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++)
        list[i] -= num;
    return list;
}

multConst = function (list1, num) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++)
        list[i] *= num;
    return list;
}

multList = function (list11, list22) {
    let list1 = JSON.parse(JSON.stringify(list11));
    let list2 = JSON.parse(JSON.stringify(list22));
    for (var i = 0; i < list1.length; i++)
        list1[i] *= list2[i];
    return list1;
}


divideList = function (list11, list22) {
    let list1 = JSON.parse(JSON.stringify(list11));
    let list2 = JSON.parse(JSON.stringify(list22));
    for (var i = 0; i < list1.length; i++)
        list1[i] /= list2[i];
    return list1;
}

minusList = function (list11, list22) {
    let list1 = JSON.parse(JSON.stringify(list11));
    let list2 = JSON.parse(JSON.stringify(list22));
    for (var i = 0; i < list1.length; i++) {
        list1[i] -= list2[i];
    }
    return list1;
}

plusList = function (list11, list22) {
    let list1 = JSON.parse(JSON.stringify(list11));
    let list2 = JSON.parse(JSON.stringify(list22));
    for (var i = 0; i < list1.length; i++) {
        list1[i] += list2[i];
    }
    return list1;
}

lessConst = function (list1, num) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++) {
        list[i] = (list[i] < num);
    }
    return list;
}

greatConst = function (list1, num) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++) {
        list[i] = (list[i] > num);
    }
    return list;
}

constMinus = function (num, list1) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++) {
        list[i] = num - list[i];
    }
    return list;
}

constDivide = function (num, list1) {
    let list = JSON.parse(JSON.stringify(list1));
    for (var i = 0; i < list.length; i++) {
        list[i] = num / list[i];
    }
    return list;
}

colorListToPalette = function (colorList) {
    let palette = [];
    for (let i = 0; i < 5; i++) {
        palette.push(rgbToHex(colorList[3 * i], colorList[3 * i + 1], colorList[3 * i + 2]));
    }
    return palette;
}

getPalette = function (pageid) {
    let palette = [];
    for (let i = 0; i < 5; i++) {
        let tempColor = hexToRgb($('div .color')[5 * pageid + i].title);
        palette.push(tempColor.r, tempColor.g, tempColor.b);
    }
    return palette;
}

setPalette = function (colorVec, pageid) {
    for (let i = 0; i < 5; i++) {
        $('div .color')[5 * pageid + i].title = colorVec[i];
        $('div .color')[5 * pageid + i].style.backgroundColor = colorVec[i];
    }
}