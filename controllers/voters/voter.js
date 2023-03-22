import jwt from 'jsonwebtoken'
import Users from '../../models/auth.js';
import CannidatesDetails from '../../models/canidates.js';

import voterforchief from '../../models/votersforChief/chief.js';

// import vorterforghc from '../../models/voterforGirlsHostelCaptain/girlsHostelcaptain.js';
// import voterforbcc from '../../models/boysCultural/boysCultural.js';
// import voterforgcc from '../../models/girlsCultural/girlsCultural.js';
// import voterforbgc from '../../mod'

export const getVotingPage = async (req, res, next) => {
    
    try {
        // const post = [
        //     'Chief Counselor',
        //     'Girls Hostel Counselor',;

        //     'Boys Hostel Counselor',
        //     'Boys Cultural Counselor',
        //     'Girls Cultural Counselor',
        //     'Boys Prayer Counselor',
        //     'Girls Prayer Counselor',
        //     'Boys Games Counselor',
        //     'Girls Games Counselor
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        
        const chief = await CannidatesDetails.find({ position: 'Chief Counselor', });
     
        const BoysCultralCounselor = await CannidatesDetails.find({ position: 'Boys Cultural Counselor', });
        const GirlsCultralCounselor = await CannidatesDetails.find({ position: 'Girls Cultural Counselor', });
        const BoysPrayerCounselor = await CannidatesDetails.find({ position: 'Boys Prayer Counselor', });
        const GirlsPrayerCounselor = await CannidatesDetails.find({ position: 'Girls Prayer Counselor', });
        const BoysHostelCounselor = await CannidatesDetails.find({ position: 'Boys HostelCounselor', });
        const GirlsHostelCounselor = await CannidatesDetails.find({ position: 'Girls Hostel Counselor', });
        const GirlsGamesCounselor = await CannidatesDetails.find({ position: 'Girls Games Counselor', });
        const BoysGamesCounselor = await CannidatesDetails.find({ position: 'Boys Games Counselor', });
        
      

       
        res.render('partials/voters/voters',
            {
             
                "chief": chief,
                "girlsHostel": GirlsHostelCounselor,
                'boysHostel': BoysHostelCounselor,
                'boysCultures': BoysCultralCounselor,
                'girlsCultures': GirlsCultralCounselor,
                'boysPrayer': BoysPrayerCounselor,
                'girlsPrayer': GirlsPrayerCounselor,
                'boysGames':  BoysGamesCounselor,
                'girlsGames': GirlsGamesCounselor,
                'errorMessage':message
        })

    } catch (e) {
        
    }
   
    
   
}

export const getSubmit = (req, res, next) => {
    res.render('partials/voters/popup')
}


export const postVotingPage = async(req, res, next) => { 
    try {
        const chief_id = req.body.chief;
        const bhc_id = req.body.bhc;
        const ghc_id = req.body.ghc;
        const bcc_id = req.body.bcc;
        const gcc_id = req.body.gcc;
        const bpc_id = req.body.bpc;
        const gpc_id = req.body.gpc;
        const bgc_id = req.body.bgc;
        const ggc_id = req.body.ggc;
        
        const email = req.session.user.email;
        const VotersforChief = await voterforchief.findOne({ email });
        if (VotersforChief) {
            console.log('YOU HAVE ALREAY VOTED');
            req.flash('error', ' Sorry, You Have Alreay Voted')
            res.redirect('/voters')
        }
        else {
            const Votersemail = await voterforchief({ email });
            Votersemail.save();
           // for chief 
            const Chief = await CannidatesDetails.findById(chief_id);
            const updateccVotes = await CannidatesDetails.findByIdAndUpdate(chief_id, { voteCount: Chief.voteCount + 1 }, { new: true })
         
            // bhc
            const bhc = await CannidatesDetails.findById(bhc_id);
            const updatebhc = await CannidatesDetails.findByIdAndUpdate(bhc_id, { voteCount: bhc.voteCount + 1 }, { new: true })
            
            // ghc
            const ghc = await CannidatesDetails.findById(ghc_id);
            const updateghc = await CannidatesDetails.findByIdAndUpdate(ghc_id, { voteCount: ghc.voteCount + 1 }, { new: true })
           // bcc
            const bcc = await CannidatesDetails.findById(bcc_id);
            const updatebcc = await CannidatesDetails.findByIdAndUpdate(bcc_id, { voteCount: bcc.voteCount + 1 }, { new: true })
            // gcc

            const gcc = await CannidatesDetails.findById(gcc_id);
            const updategcc = await CannidatesDetails.findByIdAndUpdate(gcc_id, { voteCount: gcc.voteCount + 1 }, { new: true })

           // gpc
            const gpc = await CannidatesDetails.findById(gpc_id);
            const updategpc = await CannidatesDetails.findByIdAndUpdate(gpc_id, { voteCount: gpc.voteCount + 1 }, { new: true })
          // bpc
            
            const bpc = await CannidatesDetails.findById(bpc_id);
            const updatebpc = await CannidatesDetails.findByIdAndUpdate(bpc_id, { voteCount: bpc.voteCount + 1 }, { new: true })
         // bgc
            const bgc = await CannidatesDetails.findById(bgc_id);
            const updatebgc = await CannidatesDetails.findByIdAndUpdate(bgc_id, { voteCount: bgc.voteCount + 1 }, { new: true })

          // ggc
            const ggc = await CannidatesDetails.findById(ggc_id);
            const updateggc = await CannidatesDetails.findByIdAndUpdate(ggc_id, { voteCount: ggc.voteCount + 1 }, { new: true })


            console.log(updateccVotes)
            console.log(updatebhc)
            console.log(updateghc)
            console.log(updatebcc)
            console.log(updategcc)
            console.log(updategpc)
            console.log(updatebpc)
            console.log(updatebgc)
            console.log(updateggc)


            res.redirect('/submit')
            console.log(Votersemail)
        }

       
        
       


        
        // console.log(chief_id)
        // console.log(bhc_id)
        // console.log(ghc_id)
        // console.log(bcc_id)
        // console.log(gcc_id)
        // console.log(bpc_id)
        // console.log(gpc_id)
        // console.log(bgc_id)
        // console.log(ggc_id)
    } catch (e) {
        console.log(e);
    }
    
}

export const getViewCv = async (req, res) => {
    try {
        const chief_id = req.params.id

        const chief = await CannidatesDetails.findById(chief_id);
        const img = chief.cv;
        console.log(img)
    
        const bcc_id = req.params.id;
        const BoysCultralCounselor = await CannidatesDetails.findById(bcc_id);
        const bccv = BoysCultralCounselor.cv;

        const gcc_id = req.params.id;
        const GirlsCultralCounselor = await CannidatesDetails.findById(gcc_id);
        const gccv = GirlsCultralCounselor.cv;

        const bpc_id = req.params.id;
        const BoysPrayerCounselor = await CannidatesDetails.findById(bpc_id);
        const bpccv = BoysCultralCounselor.cv;

        const gpc_id = req.params.id;
        const GirlsPrayerCounselor = await CannidatesDetails.findById(gpc_id);
        const gpcv = GirlsPrayerCounselor.cv;

        const bhc_id = req.params.id;
        const BoysHostelCounselor = await CannidatesDetails.findById(bhc_id);
        const bhcv = BoysHostelCounselor.cv;


        const ghc_id = req.params.id;

        const GirlsHostelCounselor = await CannidatesDetails.findById(ghc_id);
        const ghcv = GirlsHostelCounselor.cv;

        const ggc_id = req.params.id;
        const GirlsGamesCounselor = await CannidatesDetails.findById(ggc_id);
        const ggcv = GirlsGamesCounselor.cv;

        const bgc_id = req.params.id;
        const BoysGamesCounselor = await CannidatesDetails.findById(bgc_id);
        const bgcv = BoysGamesCounselor.cv;
        
        res.render('partials/voters/viewCv', {
            "chief": img,
            "girlsHostel": GirlsHostelCounselor,
            'boysHostel': BoysHostelCounselor,
            'boysCultures': BoysCultralCounselor,
            'girlsCultures': GirlsCultralCounselor,
            'boysPrayer': BoysPrayerCounselor,
            'girlsPrayer': GirlsPrayerCounselor,
            'boysGames': BoysGamesCounselor,
            'girlsGames': GirlsGamesCounselor,
            
        })



    } catch (e) {
        console.log(e)

        
    }
}
