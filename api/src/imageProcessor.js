const path = require("path");
const { Worker, isMainThread } = require("path");

const pathToResizeWorker = path.resolve(__dirname, "resizeWorker.js");
function imageProcessor() {
    return new Promise((resolve, reject) => {
        if (isMainThread) {

        } else {
            reject(new Error("not on main thread"))
        }
    });
};

module.exports = imageProcessor;

