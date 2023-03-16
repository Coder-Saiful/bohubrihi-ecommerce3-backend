const {Profile} = require('../models/profile');
const _ = require('lodash');

// get profile info
module.exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user._id})
            .populate('user', 'name');
        console.log(profile)
        return res.status(200).send(profile);
    } catch (error) {
        return res.status(400).send({message: "An error occured."});
    }
}

// set profile info
module.exports.setProfile = async (req, res) => {
    try {
        const userProfile = _.pick(req.body, ["phone", "address1", "address2", "city", "state", "postcode", "country"]);
        userProfile.user = req.user._id;
        userProfile.phone = parseInt(userProfile.phone);
        userProfile.postcode = parseInt(userProfile.postcode);
        let profile = await Profile.findOne({user: req.user._id});
        if (profile) {
            await Profile.updateOne({user: req.user._id}, userProfile);
            return res.status(200).send({message: "Your profile updated successfully!"});
        } else {
            profile = new Profile(userProfile);
            await profile.save();
            return res.status(201).send({message: "Your profile info saved successfully!"});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "An error occured."});
    }
}
