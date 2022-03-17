import sequelize from "../database";
import account_model from "../models/account.models";
import phone_number_model from "../models/phone_number.models";
import account_seeds from "../seeds/account.seeds";
import phone_number_seeds from "../seeds/phone_number.seeds";


sequelize.authenticate().then(async() => {
    console.log("database connnected");

    try {
        await sequelize.sync();

        // seeds migrations
        await account_model.bulkCreate(account_seeds);
        await phone_number_model.bulkCreate(phone_number_seeds);

        //Model.destroy({where: {}}).then(function () {});

    } catch (error:any) {
        console.log(error.message)
        console.log('Migrations probably already done');
    }

}).catch((e:any) => {
    console.log(e.message);
})