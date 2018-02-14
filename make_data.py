from os import listdir, walk
from os.path import isfile, join, dirname, realpath, isdir

from pymongo import MongoClient
import random

client = MongoClient()
db = client.eckovation

dir_path = dirname(realpath(__file__))
my_path = join(dir_path, 'public/images/data/')
print(my_path)
dir_list = list()
file_list = list()
for root, directories, filenames in walk(my_path):
    for directory in directories:
        dir_name = join(root, directory)
        dir_list.append(dir_name)
    for filename in filenames:

        file_address = join(root, filename)
        filename = filename.split('.')[0]
        category = file_address.split('/')[-2]
        gender = file_address.split('/')[-3]
        file_address = '/'.join(file_address.split('/')[-5:])
        cost = random.randint(700, 2000)
        availbility = random.randint(1, 100)
        data = {
                'name': filename,
                'address': "/"+file_address,
                'category':category,
                'gender':gender,
                'cost':cost,
                'availbility':availbility
                }

        db.items.insert_one(data)
