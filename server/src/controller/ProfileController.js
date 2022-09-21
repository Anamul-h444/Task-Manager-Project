const UserModel = require('../model/UserModel')
var jwt = require('jsonwebtoken')

exports.regestrationUser = (req, res)=>{
    const reqBody = req.body;
    UserModel.create(reqBody, (err, data)=>{
        if(err){
            res.status(404).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

exports.loginUser = (req, res)=>{
    const email = req.body['email'];
    const password = req.body['password'];
    UserModel.find({email:email, password:password}, (err, data)=>{
        if (err){
            res.status(400).send(err)
        }else{
            if(data.length>0){
                let paylod = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 *60), 
                    data: data
                }
                let token = jwt.sign(paylod, "secretKey123")
                
                res.status(200).json({data:data,token:token})
            }else{
                res.status(401).send('Please insert correct userName or Password!')
            }
        }
    })
};

exports.selectProfile = (req, res)=>{    //Authentication by middleware
    let email = req.headers.email;
    UserModel.find({email:email}, (err, data)=>{
        if (err){
            res.status(400).send(err)
        }else{
            res.status(200).send(data)

        }
    })
};

exports.updateProfile = (req, res)=>{
    let email = req.headers.email;
    let reqBody = req.body;
    //console.log('reqbody', reqBody)
    UserModel.updateMany({email:email}, {$set:reqBody}, {new:true}, (err, data)=>{
        if (err){
            res.status(400).send(err)
        }else{
            res.status(200).send(data)

        }
    } )
}

exports.profileDetails=(req,res)=>{
    let email= req.headers['email'];
    UserModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}
