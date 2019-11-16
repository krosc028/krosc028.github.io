from flask import Flask, request, Response, render_template
import requests
import itertools
from flask_wtf.csrf import CSRFProtect
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, RadioField
from wtforms.validators import Regexp, Optional, ValidationError
import re

def validate(self):
        valid = True
        if not FlaskForm.validate(self):
           valid = False
        if not self.pattern and not self.avail_letters:
            raise ValidationError("Email or phone required")
            valid = False
        return valid

"""def eitherOr():
    form = WordForm()
    valid= True
    if form.pattern.data== "" and form.avail_letters.data== "":
        raise ValidationError("pattern or letters input is required")
        valid=False
    return valid"""



class WordForm(FlaskForm):
    avail_letters = StringField(u"Letters", validators= [
        Regexp(r'^[a-z]+$', message="must contain letters only"), Optional()
    ])
    pattern = StringField(u"Patter", validators= [Optional(), 
        Regexp(r'^[a-z.]+$', message="must contain letters and . to represent desired pattern")
    ])
    length_word = RadioField('WordLength', choices=[(3,'3'), (4,'4'), (5,'5'),
        (6, '6'), (7, '7'),(8,'8'), (9, '9'), (10, '10')], coerce=int, id='lenstyle',
         validators= [Optional()])
    submit = SubmitField("Go")

    def validate_pattern(form, field):
        length_word= form.length_word.data
        avail_letters= form.avail_letters.data
        pattern= form.pattern.data
        if length_word!=None:
            if len(field.data) >  length_word:
                raise ValidationError(
                    "pattern length must be equal or less than length_word")
        elif avail_letters=="":
            if len(field.data)> 10:
                raise ValidationError(
                    "Pattern entered is too large must be less than 10")
        else:
            if len(field.data)> len(avail_letters):
                raise ValidationError(
                    "Pattern entered is too large must be less than or equal to length of letters")

    def validate_length_word(form, field):
        avail_letters= form.avail_letters.data
        if avail_letters!="":
            if field.data> len(avail_letters):
                raise ValidationError(
                    "Length selected is too large must be less than or equal to length of letters")

    def validate_avail_letters(form, field):
        if len(field.data)> 10:
                raise ValidationError(
                    "Letters entered is too large must be less than 10")


    def validate(self): #code taken from https://stackoverflow.com/questions/29703979/flask-conditional-validation-on-multiple-form-fields
        if not super(WordForm, self).validate():
            return False
        if not self.avail_letters.data and not self.pattern.data:
            msg = 'At least Letters or Pattern must have data entered'
            self.avail_letters.errors.append(msg)
            self.pattern.errors.append(msg)
            return False
        return True






csrf = CSRFProtect()
app = Flask(__name__)
app.config["SECRET_KEY"] = "row the boat"
csrf.init_app(app)

@app.route('/index')
def index():
    form = WordForm()
    return render_template("index.html", form=form)


@app.route('/words', methods=['POST','GET'])


def letters_2_words():
    form = WordForm()
    if form.validate_on_submit():
        letters = form.avail_letters.data
    else:
        return render_template("index.html", form=form)

    with open('sowpods.txt') as f:
        good_words = set(x.strip().lower() for x in f.readlines())

    word_set=wordmaker(good_words)
    pattern_wordset= patternmaker(word_set)
    new_wordset= word_length(pattern_wordset, letters)
    if len(pattern_wordset)==0 or len(new_wordset)==0:
        return render_template('wordlist.html',
        statement="No Words Found Matching Input!")

    defintions= definitionMaker(new_wordset)
    return render_template('wordlist.html',
        wordlist=new_wordset,
        statement="Words Found:",
        defintion_dictionary= defintions,
        #key= "?/8a457651-c307-4f9c-a470-4a6dcb44c5e9"
        #wordlist=sorted(word_set)#,
        #name="CS4131"
        )

def wordmaker(good_words):
    form = WordForm()
    word_set = set()
    if form.avail_letters.data!= "":
        letters = form.avail_letters.data
        for l in range(3,len(letters)+1):
            for word in itertools.permutations(letters,l):
                w = "".join(word)
                if w in good_words:
                    word_set.add(w)

    else:
        word_set=good_words
    return word_set



def patternmaker(word_set):
    form = WordForm()
    pattern_wordset= set()
    if form.pattern.data!= "":
        pat= form.pattern.data
        num=0;
        count=0;
        for l in pat:
            if l != "." and count==0:
                for t in word_set:
                    if len(t)> num and t[num]== l:
                        pattern_wordset.add(t)
                        count+=1
            elif l!= "." and count>0:
                pattern_wordset=pattern2beyond(pattern_wordset, num, l)
            num+=1
    else:
        for t in word_set:
            pattern_wordset.add(t)
    return pattern_wordset

def pattern2beyond(pattern_wordset, num, l):
    newPattern_wordset= set()
    for t in pattern_wordset:
        if len(t)> num and t[num]== l:
            newPattern_wordset.add(t)
    return newPattern_wordset


def word_length(word_set, letters):
    form = WordForm()
    new_wordset= []
    if form.length_word.data!= None:
        length=form.length_word.data
        i= length
        for t in sorted(word_set):
            if length== len(t):
                new_wordset.append(t)
    else:
        i=3
        while i< len(letters)+1:
            for t in sorted(word_set):
                if len(t)==i:
                    new_wordset.append(t)
            i+=1
    return new_wordset

def definitionMaker(word_set):
    website="https://www.dictionaryapi.com/api/v3/references/collegiate/json/"
    key= "?key=8a457651-c307-4f9c-a470-4a6dcb44c5e9"
    dictionary= {}
    for i in word_set:
        new_website= ""+website+i+key
        dictionary[i]= wordArray(i, new_website)
    return dictionary


def wordArray(word, new_website):
    r= requests.get(new_website)
    new_def=[]
    data= r.json()
    if isinstance(data[0],str):
        new_def.append("no definition found")     
    else:
        defintions=data[0]['shortdef']
        i=0
        if len(defintions)<10:
            num=len(defintions)
        else:
            num= 10
        while i< num :
            new_def.append(defintions[i])
            i+=1
    return new_def






   




@app.route('/proxy')
def proxy():
    result = requests.get(request.args['url'])
    resp = Response(result.text)
    resp.headers['Content-Type'] = 'application/json'
    return resp


