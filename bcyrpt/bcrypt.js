import bcrypt from "bcrypt";



async function hashPassword(String) {
    const hashPass =  await bcrypt.hash (String,12)
    return hashPass;

}
// const getHashPW = await hashPassword("goodmoring12") 
// console.log(getHashPW);


bcrypt.compare("goodmoring12", "$2b$12$2HkIoZtox8PqqpxlmziVPeXjHfSqPgNVkVlHFqgXaZqdQoZCnAtYa", function(err, result) {
    if("goodmoring" === "$2b$12$2HkIoZtox8PqqpxlmziVPeXjHfSqPgNVkVlHFqgXaZqdQoZCnAtYa"){
        console.log("yes milf");
    }
    // result == false
});
