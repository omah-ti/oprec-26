import { IGetRequestWithUser } from "@/types/getUserRequest";
import { Response, NextFunction } from "express";
import User from "@/models/userModels";
import Divisi from "@/models/divisiModels";
import Penugasan from "@/models/penugasanModels";

export const sudahMengumpulkanOti = async(
    req: IGetRequestWithUser, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await User.findById(userId).populate("prioritasOti");
        
        if (!user?.prioritasOti) {
            res.status(400).json({ message: "Belum memilih divisi OTI" });
            return;
        }

        const divisiOti = await Divisi.findById(user.prioritasOti);
        
        if (!divisiOti) {
            res.status(400).json({ message: "Divisi OTI tidak ditemukan" });
            return;
        }

        // Check if user has submitted assignment for OTI division
        const penugasan = await Penugasan.findOne({
            disubmitOleh: userId,
            disubmitDi: divisiOti._id
        });

        if (!penugasan) {
            res.status(403).json({ 
                message: "Kamu harus mengumpulkan tugas divisi OTI terlebih dahulu sebelum bisa memilih jadwal wawancara" 
            });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const sudahMengumpulkanHima = async(
    req: IGetRequestWithUser, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await User.findById(userId).populate("prioritasHima");
        
        if (!user?.prioritasHima) {
            res.status(400).json({ message: "Belum memilih divisi HIMAKOM" });
            return;
        }

        const divisiHima = await Divisi.findById(user.prioritasHima);
        
        if (!divisiHima) {
            res.status(400).json({ message: "Divisi HIMAKOM tidak ditemukan" });
            return;
        }

        // Check if user has submitted assignment for HIMAKOM division
        const penugasan = await Penugasan.findOne({
            disubmitOleh: userId,
            disubmitDi: divisiHima._id
        });

        if (!penugasan) {
            res.status(403).json({ 
                message: "Kamu harus mengumpulkan tugas divisi HIMAKOM terlebih dahulu sebelum bisa memilih jadwal wawancara" 
            });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
