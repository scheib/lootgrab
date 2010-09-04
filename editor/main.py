#!/usr/bin/env python

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util

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

# Models
class Entity(db.Model):
  name = db.StringProperty()
  img = db.BlobProperty()
  img_url = db.StringProperty()

  def get_id(self):
    return id_encode(self.key().id())

def dbEntity(id):
  return Entity.get_by_id(int(id_decode(id)))


class Cell(db.Model):
  ground = db.ReferenceProperty(Entity)
  entities = db.ListProperty()

  def get_id(self):
    return id_encode(self.key().id())

def dbCell(id):
  return Cell.get_by_id(int(id_decode(id)))


class World(db.Model):
  width = db.NumberProperty()
  height = db.NumberProperty()
  cells = db.ListProperty()

  def get_id(self):
    return id_encode(self.key().id())

def dbWorld(id):
  return World.get_by_id(int(id_decode(id)))


# Handlers
class MainHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write('Hello world!')


class SaveEntity(webapp.RequestHandler):
  def post(self):
    data = simplejson.parse(self.request.get("data"))

    if data.id:
      entity = dbEntity(data.id)
    
    if not entity:
      entity = Entity()
    
    if self.request.get("img"):
      entity.img = self.request.get("img")
    if self.request.get("name"):
      entity.name = self.request.get("name")

    entity.put()

class SaveCell(webapp.RequestHandler):


# Main
def main():
  application = webapp.WSGIApplication([
    ('/', MainHandler),
    ('/api/saveentity', SaveEntity),
    ('/api/savecell', SaveCell),
    ('/api/saveworld', SaveWorld),
  ], debug=True)
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()