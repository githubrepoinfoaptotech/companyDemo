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
    reasonForHiring:{
        type:Sequelize.STRING,
        allowNull:true
    },
    projectRegion:{
        type:Sequelize.STRING,
        allowNull:true
    },
    projectLocation:{
        type:Sequelize.STRING,
        allowNull:true
    },
    hrbpCode:{
        type:Sequelize.STRING,
        allowNull:true
    },
    approved:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    },
    billable:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    },
    handlerId:{
        type:Sequelize.UUID,
        allowNull:true,
        references: {
            model: Recruiter, 
            key: 'id',
         }
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
    },
    token:{
        type:Sequelize.STRING,
        allowNull:true
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
clients.belongsTo(Recruiter, { foreignKey: 'handlerId', targetKey: 'id' });
Recruiter.hasMany(clients, { foreignKey: 'handlerId', sourceKey: 'id' });
statusList.hasMany(clients, { foreignKey: 'statusCode' });
clients.belongsTo(statusList, { foreignKey: 'statusCode', targetKey:'statusCode' });

module.exports=clients;