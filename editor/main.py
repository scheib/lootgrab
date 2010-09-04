#!/usr/bin/env python

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
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

# Models
class Entity(db.Model):
  name = db.StringProperty()
  img = db.BlobProperty()
  img_url = db.StringProperty()

  def get_id(self):
    return id_encode(self.key().id())

  def get_data(self):
    return {
      'name' : self.name,
      'img' : get_serving_url(self.img)
    }

def dbEntity(id):
  return Entity.get_by_id(int(id_decode(id)))


class Cell(db.Model):
  ground = db.StringProperty() #EntityID
  entities = db.ListProperty(str, default=[]) #EntityIDs

  def get_id(self):
    return id_encode(self.key().id())
  
  def get_data(self):
    return {
      'ground' : self.ground,
      'entities' : self.entities
    }

def dbCell(id):
  return Cell.get_by_id(int(id_decode(id)))


class World(db.Model):
  name = db.StringProperty()
  width = db.NumberProperty()
  height = db.NumberProperty()
  cells = db.ListProperty(str, default=[])

  def get_id(self):
    return id_encode(self.key().id())

  def get_data(self):
    return {
      'name' : self.name,
      'width' : self.width,
      'height' : self.height,
      'cell' : self.cells
    }

def dbWorld(id):
  return World.get_by_id(int(id_decode(id)))


# Handlers
class MainHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write('Hello world!')


class SaveEntity(webapp.RequestHandler):
  def post(self):
    data = simplejson.parse(self.request.get("data"))
    img = self.request.get('imgfile')

    if data.id:
      entity = dbEntity(data.id)
    
    if not entity:
      entity = Entity()
    
    if self.request.get("imgfile"):
      entity.img = self.request.get("imgfile")
    if self.request.get("name"):
      entity.name = self.request.get("name")

    entity.put()

    self.response.out.write(entity.get_id())


class SaveCell(webapp.RequestHandler):
  def post(self):
    data = simplejson.parse(self.request.get("data"))

    if data.id:
      cell = dbCell(data.id)
    
    if not cell:
      cell = Cell()
    
    # TODO(glen): Validate data.
    cell.ground = self.request.get("ground")
    cell.entities = self.request.get("entites")
    cell.put()

    self.response.out.write(cell.get_id())


class SaveWorld(webapp.RequestHandler):
  def post(self):
    data = simplejson.parse(self.request.get("data"))

    if data.id:
      world = dbWorld(data.id)
    
    if not world:
      world = World()
    
    # TODO(glen): Validate data.
    world.name = self.request.get("name")
    world.width = self.request.get("width")
    world.height = self.request.get("height")
    world.cells = self.request.get("cells")
    world.put()


class GetWorld(webapp.RequestHandler):
  def get(self, id):
    world = dbWorld(id)
    if not world:
      return
    
    data = {}
    data.cells = {}
    data.entities = {}

    for cell_id in world.cells:
      cell = dbCell(cell_id)

      data.cells[cell.get_id()] = cell.get_data()

      for entity_id in cell.entities:
        if entity_id not in data.entities:
          data.entities[entity_id] = cell.get_data()
    self.response.out.write(simplejson.dumps(data))

# Main
def main():
  application = webapp.WSGIApplication([
    ('/', MainHandler),
    ('/api/saveentity', SaveEntity),
    ('/api/savecell', SaveCell),
    ('/api/saveworld', SaveWorld),
    ('/api/getworld/(.*)', GetWorld)
  ], debug=True)
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()