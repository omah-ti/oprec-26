import { Request, Response } from "express";
import { IGetRequestWithUser } from "../types/getUserRequest";
import { IDivisi } from "../types/IDivisi";
import { IDivisiSlot, IWawancara } from "../types/IWawancara";
import Wawancara from "../models/wawancaraModels";
import User from "../models/userModels";

interface DIVISISLOT{
    [key: string]: IDivisiSlot;
}
async function handleWawancaraSelection(
    req: IGetRequestWithUser,
    res: Response,
    isHimakom: boolean
): Promise<void> {
    // Implement this function
    try{
        if(!req.user) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const queryFields = isHimakom ? "prioritasHima" : "prioritasOti";
        const tanggalFields = isHimakom ? "tanggalPilihanHima" : "tanggalPilihanOti";
        const tanggalConflict = isHimakom ? "tanggalPilihanOti" : "tanggalPilihanHima";
        const {userId} = req.user;
        const {wawancaraId} = req.params;
        const {jamWawancara} = req.body;
        const jamWawancaraDate = new Date(jamWawancara);

        const [wawancara, user] = await Promise.all([
            Wawancara.findById(wawancaraId).populate("tanggal.sesi.slotDivisi"),
            User.findById(userId)
            .populate<{prioritasHima: IDivisi; prioritasOti: IDivisi}>(queryFields)
            .populate<{tanggalPilihanOti: IWawancara; tanggalPilihanHima: IWawancara}>(`${tanggalFields}.tanggalId`)
            .populate<{tanggalPilihanOti: IWawancara; tanggalPilihanHima: IWawancara}>(`${tanggalConflict}.tanggalId`)
        ]);
        if(!wawancara) {
            res.status(400).json({message: "Wawancara gaada"});
            return;
        }
        if(!user || !user[queryFields]) {
            res.status(400).json({message: `User atau ${queryFields} gaada`});
            return;
        }
        const possibleConflict = (user[tanggalConflict].tanggalId as unknown as IWawancara)?.sesi.filter(sesi => sesi.dipilihOleh.includes(userId)) || [];
        if(possibleConflict.length > 0) {
            const hasConflicts = possibleConflict[0]?.jam.getTime() === jamWawancaraDate.getTime();
            if(hasConflicts) {
                res.status(400).json({message: `Waktu wawancara yang dipilih sudah dipilih untuk ${tanggalConflict}`});
                return;
            }
        }
        
        if(user[tanggalFields].tanggalId) { 
            res.status(400).json({message: `User sudah memilih waktu wawancara untuk ${tanggalFields}`});
            return;
        }
        const matchingSesi = wawancara.sesi.find(sesi => sesi.jam.getTime() === jamWawancaraDate.getTime());
        const slug = user[queryFields].slug; // Use type assertion for slug
        if (matchingSesi) {
            const slotDivisi = matchingSesi.slotDivisi as unknown as DIVISISLOT; // Ensure proper typing
            // Check if the slug exists in slotDivisi
            if (slug in slotDivisi) {
                if ((slotDivisi[slug]?.sisaSlot || 0)  <= 0) {
                    res.status(400).json({ message: `Slot untuk ${slug} habis` });
                    return;
                } else {
                    (slotDivisi[slug] as IDivisiSlot).sisaSlot -= 1;
                    matchingSesi.dipilihOleh.push(userId);
                    user[tanggalFields].tanggalId = wawancara.id;
                }
            } else {
                res.status(400).json({ message: `Divisi ${slug} tidak ditemukan` });
                return;
            }
        }
        await Promise.all([wawancara.save(), user.save()]);
        res.status(200).json({ message: "Waktu wawancara berhasil dipilih" });
        return;
    } catch (err) {
        res.status(500).json({ message: err });
        return;
    }
}
export const pilihWaktuWawancaraOti = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    await handleWawancaraSelection(req, res, false);
}

export const pilihWaktuWawancaraHima = async (req: IGetRequestWithUser, res: Response): Promise<void> => {
    await handleWawancaraSelection(req, res, true);
}

export const getAllWawancara = async (_req: Request, res: Response): Promise<void> => {
    try {
        const [wawancaraHimakom, wawancaraOti] = await Promise.all([
            Wawancara.find({himakom: true}),
            Wawancara.find({himakom: false})
        ]) 
        res.status(200).json({ wawancaraHimakom, wawancaraOti });
        return;
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}