const States = {
    normal: 0,
    waiting1: 1,
    waiting2: 2,
    waiting3: 3,
    waiting4: 4,
    error: 99,
    esUnState: function(st) {return st==States.normal || st==States.error || st==States.waiting1 || st==States.waiting2 || st==States.waiting3 || st==States.waiting4;},
}

module.exports = {
    States
}

