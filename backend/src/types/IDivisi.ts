import mongoose, {Document} from "mongoose"

export interface IDivisi extends Document{
    judul: string,
    judulPanjang: string,
    logoDivisi: string,
    slot: number,
    slug: string,
    proker?: [IProker],
    deskripsi: string,
    dipilihOleh?: mongoose.Types.ObjectId[],
    himakom: boolean,
    penugasan: IPenugasan
}
export interface IProker extends Document{
    url?: string,
    filename?: string,
    deskripsiProker?: string
}

export interface IPenugasan extends Document{
    deskripsiPenugasan: string,
    toolsPenugasan: string,
    linkPenugasan: string,
    deadline?: Date,
}
