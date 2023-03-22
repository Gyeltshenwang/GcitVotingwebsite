import CannidatesDetails from "../../models/canidates.js"
import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./images"); // save images in current directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); // save
//     }
// });

// export const upload = multer({
//     storage: storage,

// }).fields([{name:'photo',maxCount:1},{name:'cv',maxCount:1}])





const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null, './images')},
    filename: (req, file, cb) => {
       cb(null,file.originalname)
    }
});
export const upload = multer({
    storage: storage,
   
}).fields([{name:'photo',maxCount:1},{name:'cv',maxCount:1}])





export const getCannidates = async (req, res, next) => { 
    try {
      
        // const cannidates = await CannidatesDetails.find();
        // console.log(cannidates)
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }

        res.render('partials/admin/addCannidates',{'errorMessage':message} )
    } catch (e) {
        console.log(e)
        
    }


}


export const postCannidates = async (req, res, next) => {
    const form = JSON.parse(JSON.stringify(req.files))
    const photo = form.photo;
    const cv = form.cv;
    var newp1 = "";
    var newp2 = "";

    photo.forEach(function (p1) {
        newp1 = p1.originalname
    });
    cv.forEach(function (p2) {
        newp2 = p2.originalname;
    });

    if (newp1 !== "" && newp2 !== "") {
        const { name, email, position, menifesto, vote } = req.body;
        console.log(menifesto);

        console.log(req.body)
        // const { photo, cv } = req.file;
        try {
            
            const cannidates = await CannidatesDetails.findOne({ email });
            if (cannidates) {
                req.flash('error', 'Cannidates have Already been Added')
                console.log('Already exist')
                res.redirect('/addCannidatesDetails')

            } else {
                const cannidates = await CannidatesDetails({ name, email, position, menifesto, photo: newp1, cv: newp2, vote });

                console.log(cannidates)
                await cannidates.save();
                req.flash('success', 'Successfully Added')
                res.redirect('/admin')
            }

        } catch (e) {
            console.log(e)
        }
        
    }

   
}


