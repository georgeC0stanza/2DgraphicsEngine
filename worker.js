self.addEventListener('message', function(e) {
    setInterval(() => {
        let rand = Math.random() * 20;
        let rand2 = Math.random() * 20;
        let rand3 = Math.random();
        let rand4 = Math.random() % 16;
        let rand5 = Math.random() % 1;
        
        self.postMessage([rand, rand2,rand3, rand4, rand5]);
        
    }, 500);

//    this.self.close();
});

