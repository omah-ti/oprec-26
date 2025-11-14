import Penugasan from "@/models/penugasanModels";
import User from "@/models/userModels";
import Divisi from "@/models/divisiModels";
import { Response } from "express";
import { IGetRequestWithUser } from "@/types/getUserRequest";

// Pengumpulan penugasan dibuka: 15 November 2025, 12:00 PM
// Pengumpulan penugasan ditutup: 21 November 2025, 12:00 PM
const SUBMISSION_OPEN_DATE = new Date(2025, 10, 15, 12, 0); // November 15, 2025, 12:00 PM
const SUBMISSION_CLOSE_DATE = new Date(2025, 10, 21, 12, 0); // November 21, 2025, 12:00 PM

const checkSubmissionPeriod = (): { isOpen: boolean; message?: string } => {
    const now = new Date();
    
    if (now < SUBMISSION_OPEN_DATE) {
        return {
            isOpen: false,
            message: `Pengumpulan penugasan belum dibuka. Akan dibuka pada ${SUBMISSION_OPEN_DATE.toLocaleString('id-ID', { 
                dateStyle: 'long', 
                timeStyle: 'short',
                timeZone: 'Asia/Jakarta'
            })}`
        };
    }
    
    if (now > SUBMISSION_CLOSE_DATE) {
        return {
            isOpen: false,
            message: `Pengumpulan penugasan sudah ditutup pada ${SUBMISSION_CLOSE_DATE.toLocaleString('id-ID', { 
                dateStyle: 'long', 
                timeStyle: 'short',
                timeZone: 'Asia/Jakarta'
            })}`
        };
    }
    
    return { isOpen: true };
};

export const submitPenugasan = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        // Check if submission period is open
        const submissionCheck = checkSubmissionPeriod();
        if (!submissionCheck.isOpen) {
            res.status(403).json({ message: submissionCheck.message });
            return;
        }

        const { slug: divisiSlug } = req.params;
        const { link, comment } = req.body;
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const { userId } = req.user;

        const [divisi, user] = await Promise.all([
            Divisi.findOne({slug: divisiSlug}),
            User.findById(userId),
        ])
        if(!divisi || !user){
            res.status(400).json({message: "Divisi atau user gaada"});
            return;
        }
        const existingPenugasan = await Penugasan.findOne({disubmitOleh: userId, disubmitDi: divisi.id});
        if(existingPenugasan){
            res.status(400).json({message: "Kamu sudah submit tugas di sini"});
            return;
        }

        const newPenugasan = new Penugasan({
            link,
            comment,
            disubmitOleh: userId,
            disubmitDi: divisi.id
        })
        user.tugas?.push(newPenugasan.id);
        await Promise.all([newPenugasan.save(), user.save()]);
        res.status(201).json({message: "Penugasan berhasil disubmit"});
        return;
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const updateTugas = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try{
        // Check if submission period is open
        const submissionCheck = checkSubmissionPeriod();
        if (!submissionCheck.isOpen) {
            res.status(403).json({ message: submissionCheck.message });
            return;
        }

        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const{ userId } = req.user;
        const { id: tugasId } = req.params;
        const { link, comment } = req.body;
        const tugas = await Penugasan.findById(tugasId);
        if(!tugas){
            res.status(404).json({message: "Tugas gaada"});
            return;
        }
        if(tugas.disubmitOleh.toString() !== userId.toString()){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        tugas.link = link || tugas.link;
        tugas.comment = comment || tugas.comment;
        await tugas.save();
        res.status(200).json({message: "Tugas berhasil diupdate"});
        return;
    } catch (err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const existingSubmission = async(req: IGetRequestWithUser, res: Response): Promise<void> => {
    try{
        const{ slug: divisiSlug } = req.params;
        const divisi = await Divisi.findOne({slug: divisiSlug});
        if(!req.user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const { userId } = req.user;
        const penugasan = await Penugasan.findOne({disubmitOleh: userId, disubmitDi: divisi?.id});
        if(!penugasan){
            res.status(200).json({message: "Belum submit penugasan", penugasan: null});
            return;
        }
        res.status(200).json({message: "Sudah submit penugasan", penugasan: penugasan});
        return;
    } catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
}

export const checkSubmissionStatus = async(_req: IGetRequestWithUser, res: Response): Promise<void> => {
    try {
        const now = new Date();
        const submissionCheck = checkSubmissionPeriod();
        
        res.status(200).json({
            isOpen: submissionCheck.isOpen,
            message: submissionCheck.message || "Pengumpulan penugasan sedang dibuka",
            openDate: SUBMISSION_OPEN_DATE,
            closeDate: SUBMISSION_CLOSE_DATE,
            currentTime: now
        });
        return;
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        return;
    }
}