

const handleSignin = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(400).json('Incorrect form submission')
	}
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(response => {
		const isValid = bcrypt.compareSync(password,response[0].hash);
		if (isValid) {
			return db.select('*').from('users')
			.where('email','=',email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('Wrong username or password')
		}
	})
	.catch(err => res.status(400).json('Wrong username or password'))
	
}

module.exports = {
	handleSignin: handleSignin
}