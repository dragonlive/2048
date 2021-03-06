function ReplayManager(id) {
  this.interval = 100;
  var that = this;
  data = get_score(id, function(score) {
    $('#replay-name').text('| Replay:' + score.nickname);
    $('#replay-name').removeClass('hidden');;
    var countryUrl = 'http://www.kidlink.org//icons/f0-cn.gif';
    if (score.country && score.country != 'null') {
        countryUrl ='http://www.kidlink.org//icons/f0-' + score.country + '.gif';
    }
    $('#replay-country').attr('src', countryUrl);
    $('#replay-country').removeClass('hidden');
    that.run(score);
  });   
}

ReplayManager.prototype.run = function(score) {
  function MockKeyboardInputManager() {
    this.on = function(a, b) {};
  };
  function MockScoreManager() {
    this.get = function() {},
    this.set = function(s) {}
  }

  var gm = new GameManager(4,
      MockKeyboardInputManager, HTMLActuator, MockScoreManager, AudioManager);
  gm.setup(score.seed);
  gm.setReplay(true);
  var moves = score.payload.moves.split(',');
  var that = this;

  var cb = function(moves, idx) {
    if (idx < moves.length) {
      gm.move(moves[idx]);
      that.timerId = window.setTimeout(function() {
        cb(moves, ++idx);
      }, that.interval);
    }
  };
  
  this.move = cb;

  cb(moves, 0);
}

ReplayManager.prototype.pause = function() {
  window.clearTimeout(this.timerId);
};

ReplayManager.prototype.resume = function() {
  this.start = new Date();
  var that = this;
  this.timerId = window.setTimeout(function() {
    that.move,
    that.interval
  });
}

ReplayManager.prototype.accelerate = function() {
  this.interval /= 2;
}

ReplayManager.prototype.decelerate = function() {
  this.interval *= 2;
}
