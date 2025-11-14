import mongoose, { Schema } from 'mongoose';
import { IDivisi, IProker, IPenugasan } from '@/types/IDivisi';

const prokerSchema: Schema<IProker> = new Schema({
    url: String,
    filename: String,
    deskripsiProker: String
});
const penugasanSchema: Schema<IPenugasan> = new Schema({
    deskripsiPenugasan: String,
    toolsPenugasan: String,
    linkPenugasan: String,
    deadline: Date,
})
const divisiSchema: Schema<IDivisi> = new Schema({
    judul: String,
    judulPanjang: String,
    logoDivisi: String,
    slot: Number,
    slug: String,
    proker: [prokerSchema],
    deskripsi: String,
    dipilihOleh: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    himakom: Boolean,
    penugasan: penugasanSchema
})
const Divisi = mongoose.model<IDivisi>('Divisi', divisiSchema);
export default Divisi; 