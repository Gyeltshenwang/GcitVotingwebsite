import CannidatesDetails from '../../models/canidates.js';


export const viewResults = async (req, res, next) => {

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
        //     'Girls Games Counselor'];
        const chief = await CannidatesDetails.find({ position: 'Chief Counselor', });

        const BoysCultralCounselor = await CannidatesDetails.find({ position: 'Boys Cultural Counselor', });
        const GirlsCultralCounselor = await CannidatesDetails.find({ position: 'Girls Cultural Counselor', });
        const BoysPrayerCounselor = await CannidatesDetails.find({ position: 'Boys Prayer Counselor', });
        const GirlsPrayerCounselor = await CannidatesDetails.find({ position: 'Girls Prayer Counselor', });
        const BoysHostelCounselor = await CannidatesDetails.find({ position: 'Boys HostelCounselor', });
        const GirlsHostelCounselor = await CannidatesDetails.find({ position: 'Girls Hostel Counselor', });
        const GirlsGamesCounselor = await CannidatesDetails.find({ position: 'Girls Games Counselor', });
        const BoysGamesCounselor = await CannidatesDetails.find({ position: 'Boys Games Counselor', });




        res.render('partials/voters/results',
            {

                "chief": chief,
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

    }

    
}