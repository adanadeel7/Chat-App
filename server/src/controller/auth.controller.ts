import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { User } from "../models/user.model";
import {checkPassword, hashPassword} from "../lib/Hash"
import { createAccessToken, createRefreshToken } from "../lib/token";

async function registerHandler(req: Request, res: Response) {
  try {
    const result = RegisterSchema.safeParse(req.body)

    if (!result.success) { 
        return res.status(400).json({
        message: "Invalid data",
        errors: result.error.flatten(),
      });
    }

    const {name, email, password} = result.data

    const normalizedEmail = String(email).toLowerCase().trim();
    
    const existingUser = await User.findOne({normalizedEmail})

    if(existingUser) { 
        return res.status(400).json({
        message: "User already Exists",
        
      });
    }

    const passwordhash = await hashPassword(password)
    
    const NewlyCreatedUser = await User.create({
        name : name, 
        email : normalizedEmail, 
        password : passwordhash, 
    })

    return res.status(201).json({
      message: "user Registered",
      user: {
        id: NewlyCreatedUser.id,
        email: NewlyCreatedUser.email,
      },
    });


  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
}


async function loginHandler(req: Request, res: Response) {
    try { 
        const result = LoginSchema.safeParse(req.body)
        if(!result.success) { 
            return res.status(400).json({
            message: "Invalid data",
            errors: result.error.flatten(),
      });
    }

    const { email, password} = result.data

    const normalizedEmail = email.toLowerCase().trim()

    const user = await User.findOne({email : normalizedEmail})

    if(!user) { 
        return res.status(400).json({
            message : "Invalid Email or Password"
        })
    }

    if(!user.password) { 
        return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const ok = await checkPassword(password,user.password)

    if(!ok) {
        return res.status(400).json({
            message : "Invalid Email or Password",
        })
    }

    const isProd = process.env.NODE_ENV
    const accessToken = createAccessToken(user.id, Number(user.tokenVersion))
    const refreshToken = createRefreshToken(user.id, Number(user.tokenVersion))

      res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

     return res.status(200).json({
      message: "Login Success",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    });

    } catch(err) {
     return res.status(500).json({
      message: "Internal Error",
    });   
    }
}



export {registerHandler}