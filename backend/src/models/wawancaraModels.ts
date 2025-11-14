import mongoose, {Schema} from 'mongoose';
import { ISesi, IWawancara, ISlotDivisiPerSesi } from '../types/IWawancara';

const slotDivisiPerSesiSchema: Schema<ISlotDivisiPerSesi> = new Schema({
    backend: {
        sisaSlot: Number,
        lokasi: String
    },
    frontend: {
        sisaSlot: Number,
        lokasi: String
    },
    uiux: {
        sisaSlot: Number,
        lokasi: String
    },
    dsai: {
        sisaSlot: Number,
        lokasi: String
    },
    cp: {
        sisaSlot: Number,
        lokasi: String
    },
    mobapps: {
        sisaSlot: Number,
        lokasi: String
    },
    gamedev: {
        sisaSlot: Number,
        lokasi: String
    },
    cysec: {
        sisaSlot: Number,
        lokasi: String
    },
    hr: {
        sisaSlot: Number,
        lokasi: String
    },
    media: {
        sisaSlot: Number,
        lokasi: String
    },
    pr: {
        sisaSlot: Number,
        lokasi: String
    },
    ipc: {
        sisaSlot: Number,
        lokasi: String
    },
    snf: {
        sisaSlot: Number,
        lokasi: String
    },
    secretary: {
        sisaSlot: Number,
        lokasi: String
    },
    treasurer: {
        sisaSlot: Number,
        lokasi: String
    },
    skilldev: {
        sisaSlot: Number,
        lokasi: String
    },
})
const sesiSchema: Schema<ISesi> = new Schema({
    jam: Date,
    dipilihOleh: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    slotDivisi: slotDivisiPerSesiSchema
})
const wawancaraSchema: Schema<IWawancara> = new Schema({
    tanggal: Date,
    himakom: Boolean,
    sesi: [sesiSchema]
})

const Wawancara = mongoose.model<IWawancara>('Wawancara', wawancaraSchema);
export default Wawancara;