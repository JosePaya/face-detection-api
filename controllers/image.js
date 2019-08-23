// CLARIFAI API
const Clarifai = require('clarifai')
// initialize with API key.
const app = new Clarifai.App({
    apiKey: 'df8b5af9a86748f690de7f20842aaf64'
});

const handleClarifaiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageURL)
        .then(data => res.json(data))
        .catch(() => res.status(400).json('Err1000: Clarifai API did not respond'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body

    db('user').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(() => res.status(400).json('Error updating user on database'))
}

module.exports = {
    handleImage
    , handleClarifaiCall
}