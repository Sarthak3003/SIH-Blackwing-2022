const Bid = require('./../models/bid.schema');
const Tender = require('./../models/tender.schema');
const { encrypt, decrypt } = require('./../utilities/utils');

const openBid = async (req) => {
    let result;
    req.body.data = decrypt(req.body.data);

    let responseObj = {
        bidderid: req.user.parentid,
        bidderOffer: req.body.data.bidderOffer
    }
}