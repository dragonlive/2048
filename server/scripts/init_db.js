var sqlite3 = require('sqlite3').verbose();
var configs = require('../configs.js');
var db = new sqlite3.Database(configs.SQLITE_FILENAME);

db.serialize(function() {
//  db.run("DROP TABLE IF EXISTS scores");
  db.run("CREATE TABLE IF NOT EXISTS scores " +
    "(nickname TEXT, score INT, max_number INT, time_used INT, " +
    "country TEXT, payload TEXT, seed INT, timestamp INT, contact TEXT, ip TEXT)");
  db.run("CREATE UNIQUE INDEX `seed_UNIQUE` ON `scores` (`seed` ASC)");
  db.run("CREATE INDEX `nickname_INDEX` ON `scores` (`nickname`)");
  db.run("CREATE INDEX `score_INDEX` ON `scores` (`score` DESC)");
/*
  var stmt = db.prepare("INSERT INTO scores VALUES (?,?,?,?,?,?)");
  for (var i = 0; i < 10; i++) {
      stmt.run(["zx " + i, 18836, 2048, 3600, "[1,2]", "US"]);
  }

  stmt.finalize();
  
  db.each("SELECT rowid AS id, score, nickname FROM scores", function(err, row) {
      console.log(row.id + ": " + row.score + row.nickname);
  });
*/
});

db.close();
