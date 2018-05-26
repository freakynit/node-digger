function digger(data, pattern, defaultValue, errorValue){
    this.data = data;
    this.pattern = pattern;
    this.defaultValue = defaultValue;
    this.errorValue = errorValue;

    this.object = function(data){
        this.data = (data !== undefined) ? data : this.data;
        return this;
    };

    this.level = function(level){
        this.pattern = (level !== undefined) ? level : this.pattern;
        return this;
    };

    this.or = function(defaultValue){
        this.defaultValue = (defaultValue !== undefined) ? defaultValue : this.defaultValue;
        return this;
    };

    this.onError = function(errorValue){
        this.errorValue = (errorValue !== undefined) ? errorValue : null;
        return this;
    };

    this.dig = function(level){
        if(this.data === undefined || this.data === null) {
            if(!this.errorValue) {
                throw new Error('data not specified');
            } else {
                if(typeof this.errorValue === 'function') {
                    this.errorValue(new Error('data not specified'),
                        this.data, this.pattern, this.defaultValue, this.errorValue);
                } else {
                    return this.errorValue;
                }
            }
        }


        var ptrn = (level !== undefined) ? level : this.pattern;
        if(ptrn === undefined || ptrn === null) {
            if(!this.errorValue) {
                throw new Error('level not specified');
            } else {
                if(typeof this.errorValue === 'function') {
                    this.errorValue(new Error('level not specified'),
                        this.data, this.pattern, this.defaultValue, this.errorValue);
                } else {
                    return this.errorValue;
                }
            }
        }

        if(!Array.isArray(ptrn)) {
            ptrn = ptrn.split('.');
        }

        if (ptrn.length < 1) {
            return this.defaultValue
        }

        for (var i = 0; i < ptrn.length; i++) {
            this.data = this.data[ptrn[i]];

            if (!this.data || this.data === undefined) {
                return (this.defaultValue) ? this.defaultValue : null;
            }
        }
        return this.data;
    };
};

digger.dig = function(data, pattern, defaultValue, errorValue){
    return new digger(data, pattern, defaultValue, errorValue).dig();
};

if(module && module.exports) {
    module.exports = digger;
}