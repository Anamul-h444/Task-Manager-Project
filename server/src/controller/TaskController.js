const TaskModel = require('../model/TaskModel')
var jwt = require('jsonwebtoken')

exports.createTask = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let email = req.headers.email

    let postBody = {
        title: title,
        description: description,
        status: status,
        email: email
    }

    TaskModel.create(postBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            res.status(200).send({ status: "Success", data: data })
        }
    })
};

exports.deleteTask = (req, res) => {
    let id = req.params.id;
    TaskModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            res.status(200).send({ status: "Success", data: data })
        }
    })
};
exports.updateStatus = (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let Query = { _id: id };
    let reqBody = { status: status };

    TaskModel.updateOne(Query, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            res.status(200).send({ status: "Success", data: data })
        }
    })
}
exports.listTaskByStatus = (req, res) => {
    let email = req.headers.email;
    let status = req.params.status;
    TaskModel.aggregate([
        { $match: { email: email, status: status } },
        {
            $project: {
                 title: 1, description: 1, status: 1,
                 Date: { $dateToString: { format: "%Y-%m-%d %H:%M", date: "$CreateDate" } }
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            res.status(200).send({ status: "Success", data: data })
        }
    }
    )
};

exports.countStatus = (req,res)=>{
    let email = req.headers.email;
    TaskModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status", sum:{$count:{}}}}
    ],(err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            res.status(200).send({ status: "Success", data: data })
        }
    } )  
}