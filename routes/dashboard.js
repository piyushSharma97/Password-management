var express = require('express');
var router = express.Router();
var userModule=require('../modules/user');
var passCatModel = require('../modules/password_category');
var passModel = require('../modules/add_password');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


/* GET home page. */

function checkLoginUser(req,res,next){
  var userToken=localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch(err) {
    res.redirect('/');
  }
  next();
}


router.get('/', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    passModel.countDocuments({}).exec((err,count)=>{
      passCatModel.countDocuments({}).exec((err,countasscat)=>{    
    res.render('dashboard', { title: 'Password Management System', loginUser:loginUser,msg:'',totalPassword:count, totalPassCat:countasscat });
    });
  });
  });

  module.exports = router;
