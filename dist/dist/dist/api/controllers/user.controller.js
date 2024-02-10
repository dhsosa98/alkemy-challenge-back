"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../dal/repositories/index.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.API_CLIENT_ID);
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username } = req.body;
    const data = req.body;
    //#############################################################
    //Verify that the user does not exists in the DB              |
    //#############################################################
    const userDB = yield index_js_1.userRepository.getByField({ username: username });
    if (userDB)
        return res.status(409).send({
            data: {
                status: true,
                errors: "this username has been used",
            },
        });
    //#############################################################
    delete data.password;
    const passwordHashed = yield bcrypt_1.default.hash(password, parseInt(process.env.SALT_HASH));
    data["password"] = passwordHashed;
    try {
        yield index_js_1.userRepository.createUser(data);
        return res.status(201).send({
            data: {
                status: true,
                errors: null,
            },
        });
    }
    catch (_a) {
        return res.status(201).send({
            data: {
                status: false,
                errors: null,
            },
        });
    }
});
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_js_1.userRepository.getAll();
    return res.send({
        data: users,
    });
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield index_js_1.userRepository.get(id);
    return res.send({
        data: user,
    });
});
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.session.user;
    const user = yield index_js_1.userRepository.get(id);
    return res.send({
        data: user,
    });
});
const deleteMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.session.user;
    const user = yield index_js_1.userRepository.deleteUser(id);
    return res.send({
        data: user,
    });
});
const updateMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data.id = req.session.user.id;
    const user = yield index_js_1.userRepository.updateUser(data);
    if (user) {
        return res.send({
            data: user,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userDeleted = yield index_js_1.userRepository.deleteUser(id);
    return res.send({
        data: userDeleted,
    });
});
const test = (req, res) => {
    return res.send({
        user: req.session.user,
    });
};
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const userUpdated = yield index_js_1.userRepository.updateUser(data);
        return res.send({
            data: userUpdated,
        });
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!req.session.user) {
        const toWhere = {
            username: username,
        };
        const user = { username, password };
        const userDB = yield index_js_1.userRepository.getByField(toWhere);
        if (userDB) {
            const passwordCompare = yield bcrypt_1.default.compare(password, userDB.password);
            if (passwordCompare) {
                const { id, username } = userDB;
                user["id"] = id;
                const userSess = { id: id, username: username };
                const token = jsonwebtoken_1.default.sign(userSess, process.env.SECRET_KEY);
                const { name, surname } = userDB;
                req.session.user = user;
                return res.send({
                    data: {
                        user: { name, surname },
                        status: true,
                        token: token,
                        errors: null,
                    },
                });
            }
        }
        return res.send({
            data: {
                status: false,
                errors: "Username and/or password is incorrect",
            },
        });
    }
    return res.send({
        data: {
            status: false,
            errors: "You are logged currently",
        },
    });
});
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!req.session.user) {
        const toWhere = {
            username: username,
        };
        let userDB = yield index_js_1.userRepository.getByField(toWhere);
        if (userDB) {
            try {
                const passwordCompare = yield bcrypt_1.default.compare(password, userDB.password);
                if (passwordCompare) {
                    res.send({
                        data: {
                            errors: "The new password it's the same old password",
                        },
                    });
                }
                else {
                    userDB["password"] = yield bcrypt_1.default.hash(password, parseInt(process.env.SALT_HASH));
                    const userUpdated = yield index_js_1.userRepository.updateUser(userDB.dataValues);
                    res.send({
                        data: userUpdated,
                    });
                }
            }
            catch (_b) { }
        }
        else {
            res.send({
                data: {
                    errors: "The username not exist",
                },
            });
        }
    }
});
const googleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = req.body;
    try {
        const { payload } = yield client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.API_CLIENT_ID,
        });
        const { email, name: fullname, email_verified } = payload;
        const username = email.split("@")[0];
        if (email_verified) {
            const user = yield index_js_1.userRepository.getByField({ username: username });
            if (user) {
                const { id, name, surname } = user;
                const userSess = { id: id, username: username };
                const token = jsonwebtoken_1.default.sign(userSess, process.env.SECRET_KEY);
                return res.status(200).send({
                    data: {
                        token,
                        user: { name, surname },
                    },
                });
            }
            else {
                const password = yield bcrypt_1.default.hash(username, parseInt(process.env.SALT_HASH));
                const [name, surname] = fullname.split(" ");
                const userCreated = yield index_js_1.userRepository.createUser({
                    username,
                    name,
                    surname,
                    password,
                });
                const { id } = userCreated;
                const userSess = { id: id, username: username };
                const token = jsonwebtoken_1.default.sign(userSess, process.env.SECRET_KEY);
                return res.status(201).send({
                    data: {
                        token,
                        user: { name, surname },
                    },
                });
            }
        }
    }
    catch (err) {
        next(err);
    }
});
const userController = {
    createUser,
    resetPassword,
    getAll,
    get,
    getMe,
    deleteMe,
    updateMe,
    login,
    deleteUser,
    updateUser,
    test,
    googleAuth,
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map