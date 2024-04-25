const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 文件数组
const files = [
    "ort.es5.min.js",
    "ort.es5.min.js.map",
    "ort.es6.min.js",
    "ort.es6.min.js.map",
    "ort.js",
    "ort.min.js",
    "ort.min.js.map",
    "ort.wasm.min.js",
    "ort.wasm.min.js.map",
    "ort.wasm-core.min.js",
    "ort.wasm-core.min.js.map",
    "ort.webgl.min.js",
    "ort.webgl.min.js.map",
    "ort.webgpu.min.js",
    "ort.webgpu.min.js.map",
    "ort-wasm.wasm",
    "ort-wasm-simd.jsep.wasm",
    "ort-wasm-simd.wasm",
    "ort-wasm-simd-threaded.jsep.js",
    "ort-wasm-simd-threaded.jsep.wasm",
    "ort-wasm-simd-threaded.wasm",
    "ort-wasm-threaded.js",
    "ort-wasm-threaded.wasm",
    "ort-wasm-threaded.worker.js",
    "ort-web.es5.min.js",
    "ort-web.es5.min.js.map",
    "ort-web.es6.min.js",
    "ort-web.es6.min.js.map",
    "ort-web.js",
    "ort-web.min.js",
    "ort-web.min.js.map",
    "ort-web.node.js",
    "ort-web.node.js.map"
];

// 基础 URL
const base_url = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.16.3/dist/';

// 下载目录
const download_dir = './';

// 确保下载目录存在
if (!fs.existsSync(download_dir)){
    fs.mkdirSync(download_dir);
}

// 遍历文件数组
files.forEach(file => {
    // 构造完整的 URL
    const url = base_url + file;

    // 发送 HTTP 请求
    axios({
        method: 'get',
        url: url,
        responseType: 'stream'
    })
    .then(function (response) {
        // 构造下载文件的完整路径
        const download_path = path.join(download_dir, file);

        // 将文件写入到本地
        const writer = fs.createWriteStream(download_path);
        response.data.pipe(writer);
        console.log(`Downloaded ${file}`);
    })
    .catch(function (error) {
        console.log(`Failed to download ${file}`);
    });
});