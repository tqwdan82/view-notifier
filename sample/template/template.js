function testClick(){
    var generator = function(min, max){
        return Math.floor(Math.random() * max) + min;
    }
    var colors = ['yellow', 'blue', 'red', 'cyan', 'green', 'gray'];
    ViewNotifier.publish('numberChanged', 
        {
            detail:{
                number:generator(0, 1000),
                textColor:colors[generator(0, 6)]
            }
    });
}