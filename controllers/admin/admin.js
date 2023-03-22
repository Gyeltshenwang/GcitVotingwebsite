import Permissions from '../../models/admin.js';
import Users from '../../models/auth.js';
import CannidatesDetails from '../../models/canidates.js';
import voterforchief from '../../models/votersforChief/chief.js'
import fs from 'fs';


export const getAdminPage = async (req, res, next) => {
    try {
        const cannidates = await CannidatesDetails.find();
        // console.log(cannidates)
        // cannidates.forEach((cannidate) => {
        //     console.log(cannidate.name)
        // })
        const totalNoCannidates = await CannidatesDetails.find().count();
        console.log(`Number of Cannidates Are: ${totalNoCannidates}`)

        console.log(cannidates)
        const TotalVoteCounts = await voterforchief.find().count();
        console.log(`this is ${TotalVoteCounts}`)
           
        ;
        console.log( );
        res.render('partials/admin/adminDashBoard', {
            'CannidatesDetails': cannidates,
            'TotalVoters': TotalVoteCounts,
            'NumberofCannidates': totalNoCannidates,
            'NumberofPost': 9

        })

        
    } catch (e) {
        console.log(e)
    }
   
       // const allowedCannidates = await Permissions.findOne();
        //res.status(200).json({ message: 'welcome to Admin Page', data: allowedCannidates });
   
}
export const createAdimPage = async (req, res, next) => {
    try {
        const { email,time } = req.body;
      
        const addCannidates = await Permissions.findOne( {email} );
        if (!addCannidates) {
            const CannidatesEmail = await Permissions({ email, time });
            CannidatesEmail.save();
           return res.json({message:'added successfully', data:email})
        }
        res.json({message:'email already exists'})
    
        

    } catch (e) {
        console.log(e)
    }
}
export const updateEmail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const UpdateEmail = await Permissions.findByIdAndUpdate(id, { update }, { new: true });
        res.status(200).json({ message: 'updated Email', data: UpdateEmail })
    } catch (e) {
        console.log(e);
    }
}

export const DeleteCannidates = async(req, res,next) => {
    try {
          const id = req.params.id;
       
        const delteCannidates = await CannidatesDetails.findByIdAndDelete(id, { new: true });
        
        res.redirect('/admin')
        console.log(id)
        console.log(delteCannidates)
    } catch (e) {
        console.log(e)
    }
}

export const getEditCannidates =  async (req, res) => {
    try {
        const { id } = req.params;
        const editCannidates = await CannidatesDetails.findById(id);
        console.log(editCannidates.name ,  editCannidates.email);
       
        res.render('partials/admin/editCannidates',{'details':editCannidates})
        
    } catch (e) {
        console.log(e)
        
    }
    

}
export const postUpdateCannidates =  async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const { name,email,menifesto,position } = req.body;
        //const new_img = '';
        // if (req.file) {
        //     new_img = req.file.filename;
        //     try {
        //         fs.unlinkSync('./images/' + req.body.old_img);
                
        //     } catch (e) {
        //         console.log(e);
                
        //     }
        // }
        // else {
        //     new_img = req.body.old_img;
        // }
        const canidateid = await CannidatesDetails.findByIdAndUpdate(id);
        const updateCannidates = await CannidatesDetails.findByIdAndUpdate(id , { name,email,menifesto,position }, { new: true });
        // res.status(200).json({ message: 'updated Email', data: updateCannidates })

        updateCannidates.save();
        res.redirect('/admin')
        console.log('this is the  ' + updateCannidates)


    } catch (e) {
        console.log(e)
        
    }
    
    
}