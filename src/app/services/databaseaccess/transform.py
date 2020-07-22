# transform

from flask import jsonify

def getallinfo(todo, type = 1):
  todo_data = todo.get().to_dict()
  for role in ["casting", "director", "producer"]:
    if todo.collection(role):
      todo_casting = [person.to_dict()['id'].get().to_dict() for person in todo.collection(role).stream()]
      todo_data[role] = todo_casting
  if type == 1:
    return jsonify(todo_data), 200
  else:
    return todo_data

def delete_collection(coll_ref, batch_size):
    docs = coll_ref.limit(batch_size).stream()
    deleted = 0

    for doc in docs:
        print(f'Deleting doc {doc.id} => {doc.to_dict()}')
        doc.reference.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)

def int_to_Roman(num):
  val = [
      1000, 900, 500, 400,
      100, 90, 50, 40,
      10, 9, 5, 4,
      1
      ]
  syb = [
      "M", "CM", "D", "CD",
      "C", "XC", "L", "XL",
      "X", "IX", "V", "IV",
      "I"
      ]
  roman_num = ''
  i = 0
  while  num > 0:
    for _ in range(num // val[i]):
      roman_num += syb[i]
      num -= val[i]
    i += 1
  return roman_num
