var expect = require('chai').expect;
var digger = require('../lib/node-digger');

describe('digger()', function(){
    it('should be able to return nested objects', function(){
        var data = {a: {b: {c: {d: 10}}}};

        expect(new digger()
            .object(data)
            .level('a.b')
            .or(100)
            .dig()).to.deep.equal({c: {d: 10}});

        expect(new digger()
            .object(data)
            .level(['a', 'b'])
            .or(100)
            .dig()).to.deep.equal({c: {d: 10}});

        expect(new digger(data, 'a.b')
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

    it('should be able to use in one-shot mode', function(){
        var data = {a: {b: {c: {d: 10}}}};

        expect(digger.dig(data, 'a.b.c.d', 100)).to.be.equal(10);
        expect(digger.dig(data, null, 100, "some error value")).to.be.equal("some error value");
    });

    it('should be able to return leaf objects', function(){
        var data = {a: {b: {c: {d: 10}}}};

        expect(new digger()
            .object(data)
            .level('a.b.c.d')
            .or(100)
            .dig()).to.be.equal(10);

        expect(new digger()
            .object(data)
            .level(['a', 'b', 'c', 'd'])
            .or(100)
            .dig()).to.be.equal(10);
    });

    it('should be able to return default', function(){
        var data = {a: {b: {c: {d: 10}}}};

        expect(new digger()
            .object(data)
            .level('a.b.c.d.e')
            .or(100)
            .dig()).to.be.equal(100);


        expect(new digger()
            .object(data)
            .level('.')
            .or(100)
            .dig()).to.be.equal(100);

        expect(new digger()
            .object(data)
            .level(['.'])
            .or(100)
            .dig()).to.be.equal(100);


        expect(new digger()
            .object(data)
            .level('')
            .or(100)
            .dig()).to.be.equal(100);

        expect(new digger()
            .object(data)
            .level([])
            .or(100)
            .dig()).to.be.equal(100);


        expect(new digger()
            .object(data)
            .level('something')
            .or(100)
            .dig()).to.be.equal(100);

        expect(new digger()
            .object(data)
            .level(['something'])
            .or(100)
            .dig()).to.be.equal(100);
    });

    it('should be able to throw exception on invalid/null input', function(){
        var data = {a: {b: {c: {d: 10}}}};

        var throwWrapper = function(d, v){
            new digger()
                .object(d)
                .level(v)
                .or(100)
                .dig()
        };

        expect(throwWrapper.bind(null, data, null)).to.throw();
        expect(throwWrapper.bind(null, data)).to.throw();
    });

    it('should not throw exception if error value is specified on invalid/null input', function(){
        expect(new digger()
            .object(null)
            .level(null)
            .or(100)
            .onError("some error value")
            .dig()).to.be.equal("some error value");
    });

    it('should call specified error handler function on invalid/null input', function(){
        var data = {a: {b: {c: {d: 10}}}};

        new digger()
            .object(data)
            .level(null)
            .or(100)
            .onError(function(err, data, level, defaultValue, errorValue){
                console.log("onError callback invoked");
                expect(err).to.not.equal(null);
                expect(data).to.deep.equal(data);
                expect(level).to.be.equal(null);
            });
    });
});

