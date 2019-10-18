// generateFromImg = async function () {
//     src = document.getElementById('can_src')
//     dst = document.getElementById('can_dst')
//     img = document.getElementById('img_in')
//     ctx_src = src.getContext('2d');
//     ctx_dst = dst.getContext('2d');
//     ctx_src.drawImage(img, 0, 0, 256, 51)
//     const dstTensor = await predict(ctx_src.getImageData(0, 0, 1, 256))
//     output = await tf.toPixels(dstTensor);
//     //console.log(rgbToHex(output[100], output[101], output[102]));
//     //右方显示
//     for (var i = 0; i < 5; i++) {
//         var color = rgbToHex(output[24 + 204 * i], output[25 + 204 * i], output[26 + 204 * i]);
//         $('div .color')[i].title = color;
//         $('div .color')[i].style.backgroundColor = color;
//     }

//     //下方显示
//     var imagedata = ctx_dst.getImageData(0, 0, 256, 51);
//     resized = tf.image.resizeBilinear(dstTensor, [51, 256])
//     resized = await tf.toPixels(resized);
//     imagedata.data.set(resized);
//     ctx_dst.putImageData(imagedata, 0, 0);
// };



// preprocess = function (imgData) {
//     return tf.tidy(() => {
//         const tensor = tf.fromPixels(imgData).toFloat()
//         const resized = tf.transpose(tensor, perm = [1, 0, 2])
//         const normalized = resized.div(127.5).sub(1);
//         const batched = normalized.expandDims(0)
//         const output = batched.mul(0.5).add(0.5)
//         tf.print(output, [output])
//         return batched
//     })
// }


// predict = async function (imgData) {
//     model = await tf.loadModel('../model/model.json');
//     return tf.tidy(() => {
//         gImg = model.predict(preprocess(imgData))
//         postImg = postprocess(gImg)
//         delete (model)
//         delete (gImg)
//         return postImg
//     })
// }

//下方显示
// src = document.getElementById('can_src')
// dst = document.getElementById('can_dst')
// ctx_src = src.getContext('2d');
// ctx_dst = dst.getContext('2d');
// var imagedata = ctx_dst.getImageData(0, 0, 256, 51);
// resized = tf.image.resizeBilinear(dstTensor, [51, 256])
// resized = await tf.toPixels(resized);
// imagedata.data.set(resized);
// ctx_dst.putImageData(imagedata, 0, 0);
//
//
// var imagedata1 = ctx_src.getImageData(0, 0, 256, 51);
// a = a.squeeze([0]).mul(0.5).add(0.5)
// resized = tf.image.resizeBilinear(a, [51, 256])
// resized = await tf.toPixels(resized);
// imagedata1.data.set(resized);
// ctx_src.putImageData(imagedata1, 0, 0);


    // $(document).mousemove(function (e) {
    //     if (!!this.move) {
    //         var posix = !document.move_target ? { 'x': 0, 'y': 0 } : document.move_target.posix,
    //             callback = document.call_down || function () {
    //                 $(this.move_target).css({
    //                     'top': e.pageY - posix.y,
    //                     'left': e.pageX - posix.x
    //                 });
    //             };

    //         callback.call(this, e, posix);
    //     }
    // }).mouseup(function (e) {
    //     if (!!this.move) {
    //         var callback = document.call_up || function () { };
    //         callback.call(this, e);
    //         $.extend(this, {
    //             'move': false,
    //             'move_target': null,
    //             'call_down': false,
    //             'call_up': false
    //         });
    //     }
    // });