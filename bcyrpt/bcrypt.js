import bcrypt, { hash } from "bcrypt";



// async function hashPassword(String) {
//     const hashPass =  await bcrypt.hash (String,12)
//     return hashPass;

// }
// // const getHashPW = await hashPassword("goodmoring12") 
// // console.log(getHashPW);


// const result = await bcrypt.compare("goodmoring12", "$2b$12$2HkIoZtox8PqqpxlmziVPeXjHfSqPgNVkVlHFqgXaZqdQoZCnAtYa");
// console.log(result);



export const getHashPW =  async function hashPassword(password) {
    return  await bcrypt.hash (password,12)
}

