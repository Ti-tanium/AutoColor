
postprocess = function (tensor) {
    return tf.tidy(() => {
        squeezed = tensor.squeeze([0]).mul(0.5).add(0.5);
        return squeezed;
    });
};

generateFromArray = async function (titleList, lockList) {
    let temp = [[], [], [], [], []];
    let hasColor = 0;
    let hasRandom = false;
    let indexList = [0, 2, 4, 3, 1];
    for (let i = 0; i < 5; i++) {
        if (lockList[i]) {
            temp[i].push(titleList[3 * i] / 127.5 - 1, titleList[3 * i + 1] / 127.5 - 1, titleList[3 * i + 2] / 127.5 - 1);
            hasColor++;
        } else {
            temp[i].push(0, 0, 0);
        }
    }
    for (let i = 0; i < 5; i++) {
        if (hasColor >= 2 && hasRandom) break;
        let j = indexList[i];
        if (!lockList[j]) {
            temp[j] = [];
            if (j == 0) temp[j].push(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5);
            else if (j == 4) temp[j].push(-Math.random() * 0.5 - 0.5, -Math.random() * 0.5 - 0.5, -Math.random() * 0.5 - 0.5);
            else
                temp[j].push(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            hasColor++;
            hasRandom = true;
        }
    }

    var array = temp[0].concat(temp[1])
    array = array.concat(temp[2])
    array = array.concat(temp[3])
    array = array.concat(temp[4])
    var a = tf.tensor(array, [1, 1, 5, 3]);
    dstTensor = await predictFromArray(a);
    var tmp = await dstTensor.data();
    var output = [];
    for (let i = 0; i < 15; i++) {
        output.push(Math.floor((tmp[i] + 1) * 127.5));
    }
    for (let i = 1; i < 4; i++) {
        let tmp = trimColor(output.slice(3 * i, 3 * i + 3));
        output[3 * i] = tmp[0];
        output[3 * i + 1] = tmp[1];
        output[3 * i + 2] = tmp[2];
    }
    //右方显示
    var trimed_1 = [];
    for (var i = 0; i < 5; i++) {
        if (lockList[i])
            trimed_1.push(rgbToHex(titleList[3 * i], titleList[3 * i + 1], titleList[3 * i + 2]));
        else
            trimed_1.push(rgbToHex(output[3 * i], output[3 * i + 1], output[3 * i + 2]));
    }
    document.getElementById('btn-generate').disabled = false;
    return trimed_1;
};

generateForStyle = async function (style) {
    let temp = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    switch (style) {
        case "cute":
            temp[0] = [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5];
            temp[2] = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1];
            temp[3] = [249 / 127.5 - 1, 205 / 127.5 - 1, 240 / 127.5 - 1];
            break;
        case "tech":
            temp[0] = [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.2 + 0.8];
            temp[4] = [-Math.random() - 0.8, -Math.random() - 0.8, Math.random() * 0.7 + 0.3];
            // temp[3] = [7 / 127.5 - 1, 18 / 127.5 - 1, 160 / 127.5 - 1];
            // temp[2] = [-1, -1, -1];
            break;
        default:
            // temp[0] = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1];
            temp[0] = [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5];
            // temp[2] = [165 / 127.5 - 1.3, 249 / 127.5 - 1.3, 211 / 127.5 - 1.3];
            temp[2] = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1];
            temp[4] = [157 / 127.5 - 1.3, 221 / 127.5 - 1.3, 252 / 127.5 - 1.3];            //todo 1.3
    }
    var array = temp[0].concat(temp[1])
    array = array.concat(temp[2])
    array = array.concat(temp[3])
    array = array.concat(temp[4])
    var a = tf.tensor(array, [1, 1, 5, 3]);
    dstTensor = await predictFromArray(a);
    var tmp = await dstTensor.data();
    var output = [];
    for (let i = 0; i < 15; i++) {
        output.push(Math.floor((tmp[i] + 1) * 127.5));
    }
    for (let i = 1; i < 4; i++) {
        let tmp = trimColor(output.slice(3 * i, 3 * i + 3));
        output[3 * i] = tmp[0];
        output[3 * i + 1] = tmp[1];
        output[3 * i + 2] = tmp[2];
    }
    //右方显示
    var trimed_1 = [];
    for (var i = 0; i < 5; i++) {
        trimed_1.push(rgbToHex(output[3 * i], output[3 * i + 1], output[3 * i + 2]));
    }
    document.getElementById('btn-generate').disabled = false;
    return trimed_1;
}

predictFromArray = async function (tensor) {
    if (loaded) {
    } else {
        loaded = true;
        model = await tf.loadLayersModel('./model/model.json');
    }
    return tf.tidy(() => {
        var gImg = model.predict(tensor);
        var postImg = postprocess(gImg);
        return postImg;
    });
};


// TODO
// 1. 组件单独改颜色,使用弹窗,类似删除按钮,放在组件右上方,改有颜色的部分
// 2. 文字改变大小,使用类似删除的按钮,放在组件右上方
// 4. 组件删除按钮的样式,在组件下面,还需要放字体的放大缩小,以及调整颜色共计四个按钮
// 5. ICON增加
// 6. BASIC增加: 类微信消息组合,微信我的中间的四项列表组合,小红点,类似微博的有点赞的框,分割线,提供三种淘宝上的顶栏