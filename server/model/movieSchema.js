const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: { type: String },
    img: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
},{
    timestamps:true
}
);

const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie ;