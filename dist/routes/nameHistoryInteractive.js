"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv1 = require("uuid/v1");
exports.default = (req, res, next) => {
    var formData = Object.keys(req.body).map(k => `${k}: ${req.body[k]}`);
    console.log(req.body);
    res.type("text/plain");
    const reply = {
        messages: [
            {
                attachment: {
                    type: "image",
                    payload: {
                        url: "https://us-central1-abc-news-169508.cloudfunctions.net/messenger-bot-functions/line-chart?" +
                            uuidv1()
                    }
                }
            }
        ]
    };
    res.json(reply);
};
//# sourceMappingURL=nameHistoryInteractive.js.map