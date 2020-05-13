self.addEventListener('message', function(e) {
    var message = e.data + 'to myself!';
    self.postMessage(message);
    this.self.close();
});