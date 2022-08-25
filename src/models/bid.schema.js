const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    bidderid: {
        type: String,
        required: true
    },
    files: [{
        name: {
            type: String, 
            required: false
        },
        url: {
            type: String, 
            required: false
        }
    }],
    boq: {
        type: {
            bidderOffer: [{
                offeredmodel: {
                    type: String,
                    required: false
                },
                unitrate: {
                    type: String,
                    required: false
                },
                totalamount: {
                    type: Number,
                    required: false
                },
                warranty: {
                    type: String,
                    required: false
                },
            }]
        }
    },
    tenderid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ACCEPTED', 'REJECTED', 'FINALIZED']
    }
});

const Bid = mongoose.model('bid', bidSchema);

module.exports = Bid;
