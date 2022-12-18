const {Profile} = require('mongoose');
const _ = require('lodash');

// get profile info
module.exports.getProfile = async (req, res) => {
    const prifle = await Profile.findOne({user: req.user._id});
    return res.status(200).send(prifle);
}

// set profile info
module.exports.setProfile = async (req, res) => {
    const userProfile = _.pick(req.body, ["phone", "address1", "address2", "city", "state", "postcode", "country"]);
    userProfile.user = req.user._id;
    let profile = await Profile.findOne({user: req.user._id});
    if (profile) {
        await Profile.updateOne({user: req.body._id}, userProfile);
        return res.status(200).send({message: "Your profile updated successfully!"});
    } else {
        profile = new Profile(userProfile);
        await Profile.save();
        return res.status(200).send({message: "Your profile info saved successfully!"});
    }
}