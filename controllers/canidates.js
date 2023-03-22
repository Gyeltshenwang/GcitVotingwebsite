import grantAccess from '../models/admin.js';
import CannidatesDetails from '../models/canidates.js';

export const getUploadCannidates = async (req, res, next) => {
    try {
        //const { name, email, photo } = req.body;
        const viewCannidatesDetails = await CannidatesDetails.find();
        res.status(200).json({ message: 'welcome to view Details of Cannidates', data: viewCannidatesDetails })
    } catch (error) {

    }
}
//post method
export const checkCannidatesAcess = async (req, res, next) => {
    try {
        const { email } = req.body;
        await grantAccess.findOne({ email })
            .then(matches => {
                if (matches) {
                    // if matches render getuploadCannidates page else access denied
                    return res.status(200).json({ message: 'Permission granted', data: email })
                }
                return res.json({ message: 'Permission denied', data: email });
            })
            .catch(e => {
                console.log(e);
            });
    } catch (e) {
        console.log(e)

    }
}
export const createUploadCannidates = async (req, res, next) => {
    try {
        const { email, name, photo,vote } = req.body;
        const allowed_to_Create = await grantAccess.findOne({ email });
        if (allowed_to_Create) {
            // if permission is granted. then create 
            const cannidates = await CannidatesDetails.findOne({ email });
            if (cannidates) {
                return res.json({ messages: 'you have already creatd with current email' })
            }
            const result = await CannidatesDetails({ email, name, photo ,vote})
            await result.save()
            res.status(200).json({ message: 'created  cannidates details', data: result });
        }
        res.json({ message: 'you are not not authorized' })

    } catch (e) {
        console.log(e);
    }
}