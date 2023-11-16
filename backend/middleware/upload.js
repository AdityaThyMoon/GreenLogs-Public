import util from "util";
import multer from "multer";
import gridfsstorage, { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config({path:'./setup.env'});

var storage = new GridFsStorage({
    url: process.env.BROWSER_URL + process.env.DATABASE_NAME,
    options: { useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg", "image.webm"];

        if(match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-aditya-${file.originalname}`
            return filename;
        }

        return {
            bucketName: process.env.IMG_BUCKET,
            filename: `${Date.now()}-aditya-${file.originalname}`
        };
    }
});

var uploadFiles = multer({ storage: storage }).single("picture");
var uploadFilesMiddleware = util.promisify(uploadFiles); // returns in a promise object instead of callback function
export default uploadFilesMiddleware;
