self.addEventListener('message', function(e) {
    function sendNumber() {
        let rand = Math.random() * 20;
        let rand2 = Math.random() * 20;
        self.postMessage([rand, rand2]);
        
        setTimeout(sendNumber, 100);
    }
    sendNumber();

    this.self.close();
});

