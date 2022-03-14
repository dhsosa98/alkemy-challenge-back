require("dotenv").config();
const { userRepository } = require("../../dal/repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.API_CLIENT_ID);

const createUser = async (req, res) => {
  const { password, username } = req.body;
  const data = req.body;

  //#############################################################
  //Verify that the user does not exists in the DB              |
  //#############################################################
  const userDB = await userRepository.getByField({ username: username });
  if (userDB)
    return res.status(409).send({
      data: {
        status: true,
        errors: "this username has been used",
      },
    });
  //#############################################################
  delete data.password;
  const passwordHashed = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_HASH)
  );
  data["password"] = passwordHashed;
  try {
    await userRepository.createUser(data);
    return res.status(201).send({
      data: {
        status: true,
        errors: null,
      },
    });
  } catch {
    return res.status(201).send({
      data: {
        status: false,
        errors: null,
      },
    });
  }
};

const getAll = async (req, res) => {
  const users = await userRepository.getAll();
  return res.send({
    data: users,
  });
};

const get = async (req, res) => {
  const { id } = req.params;
  const user = await userRepository.get(id);
  return res.send({
    data: user,
  });
};

const getMe = async (req, res) => {
  const { id } = req.session.user;
  const user = await userRepository.get(id);

  return res.send({
    data: user,
  });
};

const deleteMe = async (req, res) => {
  const { id } = req.session.user;
  const user = await userRepository.deleteUser(id);

  return res.send({
    data: user,
  });
};

const updateMe = async (req, res) => {
  const data = req.body;
  data.id = req.session.user.id;
  const user = await userRepository.updateUser(data);
  if (user) {
    return res.send({
      data: user,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userDeleted = await userRepository.deleteUser(id);
  return res.send({
    data: userDeleted,
  });
};

const test = (req, res) => {
  return res.send({
    user: req.session.user,
  });
};

const updateUser = async (req, res) => {
  const data = req.body;
  const userUpdated = await userRepository.updateUser(data);
  return res.send({
    data: userUpdated,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!req.session.user) {
    const toWhere = {
      username: username,
    };
    const user = { username, password };
    const userDB = await userRepository.getByField(toWhere);
    if (userDB) {
      const passwordCompare = await bcrypt.compare(password, userDB.password);
      if (passwordCompare) {
        const { id, username } = userDB;
        user["id"] = id;
        const userSess = { id: id, username: username };
        const token = jwt.sign(userSess, process.env.SECRET_KEY);
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
};

const resetPassword = async (req, res) => {
  const { username, password } = req.body;
  if (!req.session.user) {
    const toWhere = {
      username: username,
    };
    const user = { username, password };
    let userDB = await userRepository.getByField(toWhere);
    if (userDB) {
      try {
        const passwordCompare = await bcrypt.compare(password, userDB.password);
        if (passwordCompare) {
          res.send({
            data: {
              errors: "The new password it's the same old password",
            },
          });
        } else {
          userDB["password"] = await bcrypt.hash(
            password,
            parseInt(process.env.SALT_HASH)
          );
          console.log(userDB.dataValues);
          const userUpdated = await userRepository.updateUser(
            userDB.dataValues
          );
          res.send({
            data: userUpdated,
          });
        }
      } catch {}
    } else {
      res.send({
        data: {
          errors: "The username not exist",
        },
      });
    }
  }
};

const googleAuth = async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    const { payload } = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.API_CLIENT_ID,
    });
    const { email, name: fullname, email_verified } = payload;
    const username = email.split("@")[0];
    if (email_verified) {
      const user = await userRepository.getByField({ username: username });
      if (user) {
        const { id, name, surname } = user;
        const userSess = { id: id, username: username };
        const token = jwt.sign(userSess, process.env.SECRET_KEY);
        return res.status(200).send({
          data: {
            token,
            user: { name, surname },
          },
        });
      } else {
        const password = await bcrypt.hash(
          username,
          parseInt(process.env.SALT_HASH)
        );
        const [name, surname] = fullname.split(" ");
        const userCreated = await userRepository.createUser({
          username,
          name,
          surname,
          password,
        });
        const { id } = userCreated;
        const userSess = { id: id, username: username };
        const token = jwt.sign(userSess, process.env.SECRET_KEY);
        return res.status(201).send({
          data: {
            token,
            user: { name, surname },
          },
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

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

module.exports = userController;
