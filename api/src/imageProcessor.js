const path = require("path");
const { Worker, isMainThread } = require("worker_threads");

const pathToResizeWorker = path.resolve(__dirname, "resizeWorker.js");
const pathToMonochromeWorker = path.resolve(__dirname, "monochromeWorker.js");

function imageProcessor(filename) {
    const sourcePath = uploadPathResolver(filename);
    const resizedDestination = uploadPathResolver("resized-" + filename);
    const monochromeDestination = uploadPathResolver("monochrome-" + filename);
    let resizeWorkerFinished = false;
    return new Promise((resolve, reject) => {
        if (isMainThread) {
            try {
                const resizeWorker = new Worker(pathToResizeWorker, { workerData: { source: sourcePath, destination: resizedDestination } });
                const monochromeWorker = new Worker(pathToMonochromeWorker, { workerData: { source: sourcePath, destination: monochromeDestination } });
                resizeWorker.on("message", message => {
                    resizeWorkerFinished = true;
                    resolve("resizeWorker finished processing");
                });
                resizeWorker.on("error", error => {
                    reject(new Error(error.message));
                });
            } catch (error) {
                reject(error)
            }
        } else {
            reject(new Error("not on main thread"))
        }
        delete resolve;
    });
};

function uploadPathResolver(filename) {
    return path.resolve(__dirname, '../uploads', filename);
};

module.exports = imageProcessor;

