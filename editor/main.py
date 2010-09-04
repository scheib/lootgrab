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

# Models
class Entity(db.Model):
  name = db.StringProperty()
  img_url = db.StringProperty()
  x = db.IntegerProperty(default=0)
  y = db.IntegerProperty(default=0)
  width = db.IntegerProperty(default=0)
  height = db.IntegerProperty(default=0)

  def get_id(self):
    return id_encode(self.key().id())

  def get_data(self):
    return {
      'id' : self.get_id(),
      'name' : self.name,
      'img' : self.img_url,
      'x' : self.x,
      'y' : self.y,
      'width' : self.width,
      'height' : self.height
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
      'id' : self.get_id(),
      'ground' : self.ground,
      'entities' : self.entities
    }

def dbCell(id):
  return Cell.get_by_id(int(id_decode(id)))


class World(db.Model):
  name = db.StringProperty()
  width = db.IntegerProperty()
  height = db.IntegerProperty()
  cells = db.ListProperty(str, default=[])

  def get_id(self):
    return id_encode(self.key().id())

  def get_data(self):
    return {
      'id' : self.get_id(),
      'name' : self.name,
      'width' : self.width,
      'height' : self.height,
      'cell' : self.cells
    }

  def get_all_data(self):
    data = self.get_data()
    data['cells'] = {}
    data['entities'] = {}

    for cell_id in self.cells:
      if not cell_id:
        continue

      cell = dbCell(cell_id)

      data.cells[cell.get_id()] = cell.get_data()

      for entity_id in cell.entities:
        if entity_id not in data.entities:
          data.entities[entity_id] = cell.get_data()
    return data


def dbWorld(id):
  return World.get_by_id(int(id_decode(id)))


# Handlers
class MainHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write('Hello world!')


class SaveEntity(webapp.RequestHandler):
  def post(self):
    data = simplejson.loads(self.request.body)

    entity = None
    if 'id' in data and data['id'] != "":
      entity = dbEntity(data['id'])
    
    if not entity:
      entity = Entity()
    
    entity.img_url = data['img_url']
    entity.mimetype = 'image/png'
    entity.name = data['name']
    entity.x = int(data['x'])
    entity.y = int(data['y'])
    entity.width = int(data['width'])
    entity.height = int(data['height'])

    entity.put()

    self.response.out.write(entity.get_id())

class GetImage(webapp.RequestHandler):
  def get(id):
    entity = dbEntity(id)

    if entity.mimetype:
      self.response.headers['Content-Type'] = entity.mimetype
    else:
      self.response.headers['Content-Type'] = 'image/png'
    self.response.out.write(entity.img)

class SaveCell(webapp.RequestHandler):
  def post(self):
    data = simplejson.loads(self.request.body)

    cell = None
    if 'id' in data and data['id'] != "":
      cell = dbCell(data['id'])
    
    if not cell:
      cell = Cell()
    
    # TODO(glen): Validate data.
    cell.ground = int(data['ground'])
    cell.entities = data['entities']
    cell.put()

    self.response.out.write(cell.get_id())

class SaveWorld(webapp.RequestHandler):
  def post(self):
    data = simplejson.loads(self.request.body)
    world = None
    if 'id' in data and data['id'] != "":
      world = dbWorld(data['id'])
    
    if not world:
      world = World()
    
    # TODO(glen): Validate data.
    world.name = data['name']
    world.width = int(data['width'])
    world.height = int(data['height'])
    world.cells = data['cells']
    world.put()

    self.response.out.write(world.get_id())


class GetWorld(webapp.RequestHandler):
  def get(self, id):
    world = dbWorld(id)
    if not world:
      return
    
    data = world.get_all_data()
    self.response.out.write(simplejson.dumps(data))

class DbgEditor(webapp.RequestHandler):
  def get(self):
    worlds = World.all().fetch(1000)
    worldlist = [];
    for world in worlds:
      worldlist.append({
        'name' : world.name,
        'id' : world.get_id()
      })

    world_json = ""
    if self.request.get("id"):
      world_json = simplejson.dumps(dbWorld(self.request.get("id")).get_all_data())

    path = os.path.join(os.path.dirname(__file__), "files/dbgeditor.html")
    self.response.out.write(template.render(path, {
      'worlds' : worldlist,
      'world_json' : world_json
    }))

# Main
def main():
  application = webapp.WSGIApplication([
    ('/', DbgEditor),
    ('/api/saveentity', SaveEntity),
    ('/api/savecell', SaveCell),
    ('/api/saveworld', SaveWorld),
    ('/api/getworld/(.*)', GetWorld),
    ('/images/(.*)', GetImage),
  ], debug=True)
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()