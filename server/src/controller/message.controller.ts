import { Request, Response } from "express";
import { User } from "../models/user.model";



export const getUsersForSidebar = async (req:Request, res : Response) : Promise<void> => { 
    const loggedInUser = req.user!

    const filterUsers = await User.find({_id : {$ne : loggedInUser}}).select("-password")

    
}