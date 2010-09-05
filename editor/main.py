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

def get_data(obj):
  data = {}
  data['id'] = obj.get_id()
  for name in obj.properties():
    data[name] = getattr(obj, name)

  for name in obj.dynamic_properties():
    data[name] = getattr(obj, name)

  return data

# Models
class Entity(db.Expando):
  name = db.StringProperty()
  def get_id(self):
    return id_encode(self.key().id())

def dbEntity(id):
  return Entity.get_by_id(int(id_decode(id)))


class Cell(db.Expando):
  entities = db.ListProperty(str, default=[])
  def get_id(self):
    return id_encode(self.key().id())

def dbCell(id):
  return Cell.get_by_id(int(id_decode(id)))


class World(db.Expando):
  name = db.StringProperty()
  cells = db.ListProperty(str, default=[])
  def get_id(self):
    return id_encode(self.key().id())
  def get_all_data(self):
    data = get_data(self)
    data['cells'] = {}
    data['entities'] = {}

    entities_to_get = {}

    for cell_id in self.cells:
      cell = dbCell(cell_id)
      if not cell: continue
      for entity_id in cell.entities:
        entities_to_get[entity_id] = entity_id
      data['cells'][cell_id] = get_data(cell)

    for entity_id in entities_to_get:
      entity = dbEntity(entity_id)
      if not entity: continue
      data['entities'][entity_id] = get_data(entity)
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
    
    for name in data:
      if name == 'id': continue
      setattr(entity, name, data[name])
    entity.put()

    self.response.out.write(entity.get_id())


class SaveCell(webapp.RequestHandler):
  def post(self):
    data = simplejson.loads(self.request.body)

    cell = None
    if 'id' in data and data['id'] != "":
      cell = dbCell(data['id'])
    
    if not cell:
      cell = Cell()
    
    for name in data:
      if name == 'id': continue
      setattr(cell, name, data[name])
    cell.put()

    self.response.out.write(cell.get_id())

class SaveWorld(webapp.RequestHandler):
  def post(self):
    data = simplejson.loads(self.request.body)
    world = None

    if 'id' in data:
      world = dbWorld(data['id'])
    else:
      world = World()
    
    for name in data:
      if name == 'id': continue
      setattr(world, name, data[name])
    world.put()

    self.response.out.write(world.get_id())


class GetWorld(webapp.RequestHandler):
  def get(self, id):
    world = dbWorld(id)
    if not world:
      return
    
    self.response.out.write(simplejson.dumps(world.get_all_data()))

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
    #('/images/(.*)', GetImage),
  ], debug=True)
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()