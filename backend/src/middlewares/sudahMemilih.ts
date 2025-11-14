import { IGetRequestWithUser } from "../types/getUserRequest";
import { Response, NextFunction } from "express";
import User from "../models/userModels";
export const sudahMemilihOti =  async(req: IGetRequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try {
        const userId = req.user?.userId;
        const user = await User.findById(userId).populate("prioritasOti");
        if(!user?.prioritasOti){
            res.status(401).json({message: "Belum memilih divisi OTI"});
            return;
        }
        next();
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const sudahMemilihHima = async(req: IGetRequestWithUser, res: Response, next: NextFunction):Promise<void> => {
    try{
        const userId = req.user?.userId;
        const user = await User.findById(userId).populate("prioritasHima");
        if(!user?.prioritasHima){
            res.status(401).json({message: "Belum memilih divisi HIMA"});
            return;
        }
        next();
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}