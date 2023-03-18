const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '5a2919de53b14d8aad9d6691a874c784',
})

const handleApiCall = (req,res) => {
app.models.predict({
	      id: 'face-detection',
	      name: 'face-detection',
	      version: '6dc7e46bc9124c5c8824be4822abe105',
	      type: 'visual-detector',
    	},
        req.body.input)
		.then(data => res.json(data))
		
}

const handleImage = (req,res,db) => {
	const {id} = req.body;

	db('users').where('id', '=', id)
  		.increment('entries',1)
  		.returning('entries')
  		.then(response => {
  			res.json(response[0].entries)
  		})
  		.catch( err => res.json('Unable to fetch entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}