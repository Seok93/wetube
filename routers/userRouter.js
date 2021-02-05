import express from "express";
import routes from "../routes";
import {
    users,
    changePassword,
    userDetail,
    getEditProfile,
    postEditProfile,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatarMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.users, users);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
    routes.editProfile,
    onlyPrivate,
    uploadAvatarMiddleware,
    postEditProfile
);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
