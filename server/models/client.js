const Sequelize=require("sequelize");
const sequelize=require("../db/db");
const Recruiter=require("./recruiter");
const statusList=require("./statusList");
const uniqueid=require("uniqid");


const clients=sequelize.define("clients",{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
    clientName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    clientIndustry:{
        type:Sequelize.STRING,
        allowNull:true
    },
    clientWebsite:{
        type:Sequelize.STRING,
        allowNull:true
    },
    aggStartDate:{
        type:Sequelize.DATE,
        allowNull:true
    },
    aggEndDate:{
        type:Sequelize.DATE,
        allowNull:true
    },
    recruiterId:{
        type:Sequelize.UUID,
        allowNull:false,
        references: {
            model: Recruiter, 
            key: 'id',
         }
    },
    uniqueId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    clientText:{
        type:Sequelize.STRING,
        allowNull:true
    },
    clientInt:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    mainId:{
        type:Sequelize.UUID,
        allowNull:false
    },
    statusCode:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: statusList, 
            key: 'statusCode',
         }
    },
    createdBy:{
        type: Sequelize.UUID,
    },
    updatedBy:{
        type: Sequelize.UUID,
    }
},{
    indexes: [
        {
            unique: true,
            fields: ['id']
        },
        {
            fields: ["mainId","uniqueId"]
        }
    ]
  }
);
clients.belongsTo(Recruiter);
Recruiter.hasMany(clients);

statusList.hasMany(clients, { foreignKey: 'statusCode' });
clients.belongsTo(statusList, { foreignKey: 'statusCode', targetKey:'statusCode' });

module.exports=clients;