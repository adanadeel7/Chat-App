import {string, z} from 'zod'

const RegisterSchema = z.object({
    id : z.string().uuid(),
    name : z.string(), 
    email : z.string(), 
    password : z.string(),


})


const LoginSchema = z.object({
    email : z.string(), 
    password : z.string(),
})


export {RegisterSchema, LoginSchema}