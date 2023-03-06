var userModel = require('./userModel');
var key = '1234567899asfffff';
var encryptor = require('simple-encryptor')(key);


module.exports.createUserDBService = (userDetails) => {

    return new Promise(function myFn(resolve,reject) {

        var userModelData = new userModel();
        userModelData.first_name = userDetails.first_name;
        userModelData.last_name=userDetails.last_name;
        userModelData.email = userDetails.email;
        userModelData.password=userDetails.password;
        var encrypted = encryptor.encrypt(userDetails.password);
        userModelData.password=encrypted;

        userModelData.save(function resultHandle(error, result){

            if(error) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports.loginUserDBService = (userDetails) =>
{
    return new Promise(function myFn(resolve, reject)
    {
        userModel.findOne({ email: userDetails.email},function getresult(errorvalue,result)
        {
            if(errorvalue)
            {
                reject({status: false,msg: "Invalid Data"});
            }
            else
            {
                if(result !=undefined && result !=null)
                {
                    var decrypted = encryptor.decrypt(result.password);

                    if(decrypted== userDetails.password)
                    {
                        resolve({status: true,msg: "User validated Successfully"});
                    }
                    else
                    {
                        reject({status: false, msg:"User Validation Failed"});
                    }
    
                }
                else
                {
                    reject({status: false, msg:"Invalid Employee Detailsss"});
                }

            }
        });
    });
}