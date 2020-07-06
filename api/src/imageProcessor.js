const path = require("path");
const { Worker, isMainThread } = require("path");

const pathToResizeWorker = path.resolve(__dirname, "resizeWorker.js");
const pathToMonochromeWorker = path.resolve(__dirname, "monochromeWorker.js");

function imageProcessor(filename) {
    const sourcePath = uploadPathResolver(filename);
    const resizedDestination = uploadPathResolver("resized-" + filename);
    const monochromeDestination = uploadPathResolver("monochrome-" + filename);
    return new Promise((resolve, reject) => {
        if (isMainThread) {

        } else {
            reject(new Error("not on main thread"))
        }
    });
};

function uploadPathResolver(filename) {
    return path.resolve(__dirname, '../uploads', filename);
};

module.exports = imageProcessor;

