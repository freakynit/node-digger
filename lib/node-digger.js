function digger(data, pattern, defaultValue){
    this.data = data;
    this.pattern = pattern;
    this.defaultValue = defaultValue;

    this.area = function(data){
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

    this.dig = function(level){
        if(this.data === undefined || this.data === null) {
            throw new Error('data not specified');
        }


        var ptrn = (level !== undefined) ? level : this.pattern;
        if(ptrn === undefined || ptrn === null) {
            throw new Error('level not specified');
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

digger.dig = function(data, pattern, defaultValue){
    return new digger(data, pattern, defaultValue).dig();
};

module.exports = digger;