var expect = require('chai').expect;
var digger = require('../lib/node-digger');

describe('digger()', function(){
    it('should be able to return nested objects', function(){
        var data = {a: {b: {c: {d: 10}}}};

        expect(new digger()
            .area(data)
            .level('a.b')
            .or(100)
            .dig()).to.deep.equal({c: {d: 10}});

        expect(new digger()
            .area(data)
            .level(['a', 'b'])
            .or(100)
            .dig()).to.deep.equal({c: {d: 10}});

        expect(new digger(data, 'a.b')
            .or(100)
            .dig()).to.deep.equal({c: {d: 10}});


        expect(new digger(data, 'a.b', 100)
            .dig()).to.deep.equal({c: {d: 10}});

        expect(new digger(data, ['a', 'b'], 100)
            .dig()).to.deep.equal({c: {d: 10}});
    });

    it('should be able to return leaf objects', function(){
        var data = {a: {b: {c: {d: 10}}}};

        expect(new digger()
            .area(data)
            .level('a.b.c.d')
            .or(100)
            .dig()).to.be.equal(10);

        expect(new digger()
            .area(data)
            .level(['a', 'b', 'c', 'd'])
            .or(100)
            .dig()).to.be.equal(10);
    });

    it('should be able to return default', function(){
        var data = {a: {b: {c: {d: 10}}}};

        expect(new digger()
            .area(data)
            .level('a.b.c.d.e')
            .or(100)
            .dig()).to.be.equal(100);


        expect(new digger()
            .area(data)
            .level('.')
            .or(100)
            .dig()).to.be.equal(100);

        expect(new digger()
            .area(data)
            .level(['.'])
            .or(100)
            .dig()).to.be.equal(100);


        expect(new digger()
            .area(data)
            .level('')
            .or(100)
            .dig()).to.be.equal(100);

        expect(new digger()
            .area(data)
            .level([])
            .or(100)
            .dig()).to.be.equal(100);


        expect(new digger()
            .area(data)
            .level('something')
            .or(100)
            .dig()).to.be.equal(100);

        expect(new digger()
            .area(data)
            .level(['something'])
            .or(100)
            .dig()).to.be.equal(100);
    });

    it('should be able to throw exception on invalid/null input', function(){
        var data = {a: {b: {c: {d: 10}}}};

        var throwWrapper = function(d, v){
            new digger()
                .area(d)
                .level(v)
                .or(100)
                .dig()
        };

        expect(throwWrapper.bind(null, data, null)).to.throw();
        expect(throwWrapper.bind(null, data)).to.throw();
    });
});

