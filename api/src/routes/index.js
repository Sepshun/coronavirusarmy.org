import { Router } from "express";
import passport from "passport";

import { respond, error, isAuthenticated } from "../helpers/utils";
import auth from "./auth";
import userInfo from "./user/info";
import { list, latest, all } from "./user/list";
import { list as initiatives, details, join, removeMember } from "./initiatives";
import { getDetails, getInitiatives, getScreenshots } from "./user/volunteer";

export default () => {
    let router = Router();

    router.get("/", (req, res) => {
        res.json({
            version: "1.0.0"
        });
    });

    router.use("/auth", auth(), respond, error);
    router.use("/user/info", userInfo());
    router.get("/user/latest", latest, respond, error);
    router.get("/user/:page", list, respond, error);
    // router.get("/user/:page/all", all, respond, error);
    router.get("/initiatives", initiatives, respond, error);
    router.get("/initiative/:id", details, respond, error);
    router.put("/initiative/:id", passport.authenticate('jwt', { session : false }), isAuthenticated, join, respond, error);
    router.delete("/initiative/:id/member/:memberId", passport.authenticate('jwt', { session : false }), isAuthenticated, removeMember, respond, error);
    router.get("/volunteer/:id", getDetails, getInitiatives, respond, error);
    router.get("/volunteer/:id", getDetails, getInitiatives, respond, error);
    router.get("/volunteer/:id/screenshots/:page", getDetails, getScreenshots, respond, error);
    
    return router;
};
