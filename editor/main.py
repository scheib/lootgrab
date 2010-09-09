#!/usr/bin/env python
import os, sys
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.ext import db
from django.utils import simplejson

# Functions
import string
ALPHABET = string.ascii_uppercase + string.ascii_lowercase + \
           string.digits + '-_'
ALPHABET_REVERSE = dict((c, i) for (i, c) in enumerate(ALPHABET))
BASE = len(ALPHABET)
SIGN_CHARACTER = '$'

def id_encode(n):
  if n < 0:
    return SIGN_CHARACTER + num_encode(-n)
  s = []
  while True:
    n, r = divmod(n, BASE)
    s.append(ALPHABET[r])
    if n == 0: break
  return ''.join(reversed(s))

def id_decode(s):
  if s[0] == SIGN_CHARACTER:
    return -num_decode(s[1:])
  n = 0
  for c in s:
    n = n * BASE + ALPHABET_REVERSE[c]
  return n

class Level(db.Expando):
  name = db.StringProperty()
  owner = db.UserProperty()
  json = db.BlobProperty()
  public = db.BooleanProperty(default=False)
  def get_id(self):
    return id_encode(self.key().id())

def dbLevel(id):
  return Level.get_by_id(int(id_decode(id)))

# Handlers
class MainHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write('Hello world!')

class EditorHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write('Hello world!')

class SaveLevel(webapp.RequestHandler):
  def post(self, id):
    user = users.get_current_user()
    if not user:
      return

    data = simplejson.loads(self.request.body)
    level = None

    if id:
      level = dbLevel(data['id'])
      if level.owner != user:
        return
    else:
      level = Level()
      level.owner = user
    
    if 'name' in data:
      level.name = data['name']

    level.json = self.request.body
    level.put()

    self.response.out.write(level.get_id())

class ListLevels(webapp.RequestHandler):
  def get(self):
    levels = Levels.gql("WHERE owner = :1", users.get_current_user()).fetch(100)
    data = []
    for level in levels:
      data.push({
        'id' : level.get_id()
        'name' : level.name
      })
    self.response.out.write(simplejson.dumps(data))

class GetLevel(webapp.RequestHandler):
  def get(self, id):
    level = dbLevel(id)
    if not level:
      return
    
    self.response.out.write(level.json)

# Main
def main():
  application = webapp.WSGIApplication([
    ('/', MainHandler),
    ('/editor/', Editor),
    ('/editor/savelevel/(.*)', SaveLevel),
    ('/editor/listlevels/(.*)', ListLevels),
    ('/getlevel/(.*)', GetLevel),
  ], debug=True)
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()