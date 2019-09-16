from django.db import models

class register(models.Model):
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    business_name = models.CharField(max_length=100)
    password = models.CharField(max_length=50)

class login(models.Model):
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

class registerResponseSuccess(models.Model):
    session_token = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class registerResponseFail(models.Model):
    error = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    username = models.CharField(max_length=50)

class loginResponseSuccess(models.Model):
    session_token = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class loginResponseFail(models.Model):
    error = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class userBlock(models.Model):
    session_token = models.CharField(max_length=50)
    block_id = models.CharField(max_length=50)

class responseSuccess(models.Model):
    status = models.CharField(max_length=50)

class responseFail(models.Model):
    error = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class profileResponseSuccess(models.Model):
    business_id = models.CharField(max_length=50)
    date_created = models.IntegerField()
    profile_picture = models.CharField(max_length=100)
    description = models.CharField(max_length=50)
    ####open_projects = array of projects

class projects(models.Model):
    project_name = models.CharField(max_length=50)
    date_created = models.IntegerField()
    description	= models.CharField(max_length=50)
    business_id	= models.CharField(max_length=50)
    current_bid	= models.IntegerField()
    ###project_photos = array of photos

class simpleProjects(models.Model):
    project_name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    business_id	= models.CharField(max_length=50)
    business_name	= models.CharField(max_length=50)
    location	= models.CharField(max_length=50)
    current_bid	= models.IntegerField()
    ###project_photos = array of photos

class projectPhoto(models.Model):
    image = models.CharField(max_length=50)
    title = models.CharField(max_length=50)

class jobSearch(models.Model):
    search_terms = models.CharField(max_length=50)
    category_1 = models.CharField(max_length=50)
    category_2 = models.CharField(max_length=50)
    order_by = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    min_price = models.CharField(max_length=50)
    max_price = models.CharField(max_length=50)
    distance = models.CharField(max_length=50)
    page_amount	= models.IntegerField()
    page_number	= models.IntegerField()

class jobResponseSuccess(models.Model):
    amount	= models.IntegerField()
    total	= models.IntegerField()
    ###results = array of simple projects

class registerJob(models.Model):
    session_token = models.CharField(max_length=50)
    project_title = models.CharField(max_length=50)
    project_description = models.CharField(max_length=50)
    project_location = models.CharField(max_length=50)
    ###project_photos = array of project photos
    
class uploadJobPhoto(models.Model):
    session_token = models.CharField(max_length=50)
    image_byte_array = models.CharField(max_length=50)

class uploadSuccess(models.Model):
    url = models.CharField(max_length=50)

class userValidate(models.Model):
    session_token = models.CharField(max_length=50)

class makeBid(models.Model):
    session_token = models.CharField(max_length=50)
    bid_value = models.CharField(max_length=50)

class conversationData(models.Model):
    user_name = models.CharField(max_length=50)
    business_name = models.CharField(max_length=50)
    business_picture = models.CharField(max_length=100)
    job_link = models.CharField(max_length=50)
    business_id = models.CharField(max_length=50)

##class conversationList(models.Model):
    ###array of conversationData

class message(models.Model):
    user_id = models.CharField(max_length=50)
    message = models.CharField(max_length=50)
    time_sent = models.IntegerField()

class messageSend(models.Model):
    session_token = models.CharField(max_length=50)
    message = models.CharField(max_length=50)

##class chatData(models.Model):
    ##conversation = array of conversation data
    ##messages = array of messages

class viewProfile(models.Model):
    user_id = models.CharField(max_length=50)

class viewJob(models.Model):
    user_id = models.CharField(max_length=50)
    session_token = models.CharField(max_length=50)

class viewConversation(models.Model):
    conversation_id = models.CharField(max_length=50)
    session_token = models.CharField(max_length=50)

