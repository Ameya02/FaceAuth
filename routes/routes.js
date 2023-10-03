const router = require("express").Router();

const { signup } = require("../controllers/signup.js");
const { login, login2 } = require("../controllers/login.js");
const { face_auth } = require("../controllers/faceauth.js");
const { isLoggedin } = require("../middlewares/userAuth.js");
const { imgHandle } = require("../middlewares/imgHandle.js");

router.post("/signup", signup);
router.post("/login", login);
router.post("/login2", login2);

router.post("/faceauth", isLoggedin,imgHandle,face_auth);
module.exports = router;
