import bcrypt from "bcryptjs"

async function hashPassword(password : string) {
    const hashedPassword = bcrypt.hash(password,12)
    return hashedPassword
}

async function checkPassword(password : string,hashedPassword: string) { 
   const result = bcrypt.compare(password,hashedPassword)
    return result
}


export {hashPassword,checkPassword}