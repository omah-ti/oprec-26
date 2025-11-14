import mongoose, {Schema} from 'mongoose';
import { IPenugasan } from '../types/IPenugasan';

const penugasanSchema: Schema<IPenugasan> = new Schema({
    link: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    disubmitOleh: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    disubmitDi:{
        type: Schema.Types.ObjectId,
        ref: 'Divisi'
    }
})

const Penugasan = mongoose.model<IPenugasan>('Penugasan', penugasanSchema);
export default Penugasan;