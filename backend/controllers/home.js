import path from "path";

const home = (req, res) => {
    return res.sendFile(path.join(`${__dirname}/../views/index.html`));
}

export default {getHome: home}
