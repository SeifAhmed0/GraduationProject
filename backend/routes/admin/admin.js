var express = require('express');

// const {userMiddleware,isAdmin} = require("../../app/middelware/auth.middelware")
const multer  = require('multer')
const upload = multer({ dest: 'public/' })
const router =express.Router()

