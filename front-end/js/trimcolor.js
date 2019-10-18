trimColor = function (img, Increment = 0.3) {
    var img_min = [];
    img_out = img;
    img_min.push(Math.min(img[0], img[1], img[2]))
    var img_max = [];
    img_max.push(Math.max(img[0], img[1], img[2]))
    var Delta = divideConst(minusList(img_max, img_min), 255);
    var Value = divideConst(plusList(img_max, img_min), 255);
    var L = divideConst(Value, 2);
    var mask_1 = lessConst(L, 0.5);

    var s1 = divideList(Delta, plusConst(Value, 0.001));
    var s2 = divideList(Delta, constMinus(2.001, Value));
    var s = plusList(multList(s1, mask_1), multList(s2, constMinus(1, mask_1)));

    var temp = plusConst(s, Increment);
    var mask_2 = greatConst(temp, 1);
    var alpha_1 = s;
    var alpha_2 = plusConst(multConst(s, 0), 1 - Increment);
    var alpha = plusList(multList(alpha_1, mask_2), multList(alpha_2, constMinus(1, mask_2)));
    alpha = minusConst(constDivide(1, plusConst(alpha, 0.001)), 1);
    img_out[0] = img[0] + (img[0] - L * 255) * alpha;
    img_out[1] = img[1] + (img[1] - L * 255) * alpha;
    img_out[2] = img[2] + (img[2] - L * 255) * alpha;
    img_out = divideConst(img_out, 255.0)

    mask_1 = lessConst(img_out, 0);
    mask_2 = greatConst(img_out, 1);

    img_out = multList(img_out, constMinus(1, mask_1));
    img_out = plusList(multList(img_out, constMinus(1, mask_2)), mask_2);

    for (let i = 0; i < img_out.length; i++)
        img_out[i] = Math.floor(img_out[i] * 255);
    return img_out;
}