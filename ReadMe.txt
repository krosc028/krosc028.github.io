1. Project Type: Plan C

2. Group Members Name: Kendra Krosch

3. Link to live Application: https://tranquil-ridge-29123.herokuapp.com/

4. Link to Github Code Repository: https://github.com/krosc028/krosc028.github.io/tree/master/codeforFinal 

5. List of Technologies/API's Used
	SQLAlchemy
	Flask -  Bootstrap, login, migrate, sqlalchemy, wtf.csrf
	werkzeug.security
	datetime
	wtforms- StringField, PasswordField, BooleanField, SubmitField, TextAreaField
	wtforms.validators- ValidationError, DataRequired, Email, EqualTo, Length
	hashlib

6. Detailed Description of the project (No more than 500 words)
	Blog
	you can sign in as Susan with password cat

7. List of Controllers and their short description (No more than 50 words for each controller)
	---login and register---
	username- StringField controller allows users to input their user name for login and 
		registration
	passowrd- Password field that allows users to input their password also to create a 
		password during registration
	password2- double checks password is the same when registering
	remember_me will save the users
	email- for when registering allows user to input and email
	----edit profile---
	username- allows signed in user to change their user name
	about-me- allows user to change the about me on their profile page
	---postform---
	post- allows user to make a post on the blog found on the home page


8. List of Views and their short description (No more than 50 words for each view)
	---I am assuming views is pages
	login- you can login to the app
	register- you can register as anyone
	index/home- allows you to post something/ shows other posts from people you follow
	explore- you can see anyone on the blogs post sorted by most recent
	profile- shows all your posts along with you tag line. Shows how many people follow 	you and your total follows. There is a link to edit profile
	edit profile- allows you the change your user name and your about me.

9. List of Tables, their Structure and short description
	User Table which has an integer id
		username
		email
		password_hash
	Post Table which also has an integer id
		body
		timestamp
		user_id- used to connect to user table
	Followers table is the association table
		follower_id
		followed_id
	User and Post table have a one to many stucture and are combined on the user_id



10. References/Resources: List all the references, resources or the online templates that were used for the project.
	https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world
	Previous code from class repository for uploading on heroku (Procfile)