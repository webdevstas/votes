conn = new Mongo();
db = conn.getDB("votes");
db.createUser({user:'vote_db_user', pwd:'kd12dsd54Ssd', roles: [{role: 'readWrite', db: 'votes'}]})
