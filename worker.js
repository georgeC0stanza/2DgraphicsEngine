self.addEventListener('message', function(e) {
    var message = e.data[0] + 'to myself!';
    self.postMessage(message);
    this.self.close();
});

