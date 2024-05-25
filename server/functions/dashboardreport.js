const candidateDetails = require('../models/candidateDetail');
const candidate = require('../models/candidate');
const requirement = require('../models/requirement');
const statusCode = require('../models/statusList');
const recruiter = require('../models/recruiter');
const client = require("../models/client");
const candidateStatus = require("../models/myCandidateStatus");
const moment = require('moment');
const Sequelize = require("../db/db");
const { Op } = require("sequelize");
const Source = require('../models/source');



exports.getData=async(req,code)=>{

        var page = req.body.page;
        var limit = 10;
        var mywhere = { mainId: req.mainId, statusCode: code };
        
        if (req.body.fromDate && req.body.toDate) {
        
            const fromDate = moment(req.body.fromDate).startOf('day').toISOString();
            const toDate = moment(req.body.toDate).endOf('day').toISOString();
            mywhere.createdAt = {
                [Op.between]: [fromDate, toDate]
            }
        }
        
        else if (req.body.year) {
            mywhere.createdAt = Sequelize.literal(`extract(year from "candidate"."createdAt") = ${req.body.year}`);
        }
        
        if(req.roleName=="RECRUITER"||req.roleName=="CLIENTCOORDINATOR"){
            mywhere.recruiterId = req.recruiterId
        }
        else if(req.roleName=="FREELANCER"||req.roleName=="SUBVENDOR"){
            mywhere.recruiterId = req.recruiterId
        }
        if (req.body.recruiterId) {
            mywhere.recruiterId = req.body.recruiterId
        }
        if (req.body.candidate) {
            mywhere.uniqueId = req.body.candidate
        }
        
        
        const can_data=await candidate.findAndCountAll({
            distinct: true,
            // attributes:[''],
            where: mywhere,
            include: [{
                model: candidateDetails,
                attributes: [
                    'firstName',
                    'lastName',
                    'email',
                    'mobile',
                    'skills',
                    'currentLocation',
                    'preferredLocation',
                    'nativeLocation',
                    'experience',
                    'relevantExperience',
                    'alternateMobile',
                    'gender',
                    'educationalQualification',
                    'differentlyAbled',
                    'currentCtc',
                    'expectedCtc',
                    'dob',
                    'noticePeriod',
                    'reasonForJobChange',
                    'candidateProcessed',
                    'reason',
                    'isExternal'
                  ]
            },
                Source,
            { model: candidateStatus, include: [{ model: statusCode, attributes: ["statusName"] }] },
        
            {
                model: requirement,
                attributes: ["requirementName", "id", "uniqueId"],
                include: [
                    {
                        model: statusCode,
                        attributes: ['statusName']
                    }, {
                        model: client,
                        attributes: ["clientName", "id", "uniqueId"],
                        include: [{ model: statusCode, attributes: ['statusName'] },{ model: recruiter, as: 'recruiter', attributes: ['id', 'firstName', 'lastName'] },
                        { model: recruiter, as: 'handler', attributes: ['id', 'firstName', 'lastName'] }],
                    }, {
                        model: recruiter,
                        attributes: ["id", "mainId", "firstName", "lastName"]
                    }]
            },
            {
                model: statusCode,
                attributes: ['statusName'],
            }, {
                model: recruiter,
                attributes: ['firstName', 'lastName', 'mobile']
            },
            ],
            limit: limit,
            offset: (page * limit) - limit,
            order: [['createdAt', 'DESC']]
        });
        return can_data;
  };
