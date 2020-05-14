self.addEventListener('message', function(e) {
    setInterval(() => {
        let rand = Math.random() * 20;
        let rand2 = Math.random() * 20;
        self.postMessage([rand, rand2]);
        
    }, 500);

//    this.self.close();
});

