# Running test
### 1. Running Mongo
```
mongod --dbpath db
```
### 2. Running Meteor on 2 process
First process config `MONGO_URL=mongodb://localhost:27017/meteor meteor --port 3000`
First process config `MONGO_URL=mongodb://localhost:27017/meteor meteor --port 3002`

### Nginx command
```
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
```