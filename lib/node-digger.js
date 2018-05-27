var digger = (function(){
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
            this.errorValue = (typeof errorValue !== "undefined") ? errorValue : null;
            return this;
        };

        this.dig = function(level){
            if(isUndefined(this.data) || isNull(this.data) || !isObject(this.data)) {

                var errorMessage = 'data not specified';

                if(!isObject(this.data)) {
                    errorMessage = 'data is not of object type';
                }

                if(!this.errorValue) {
                    throw new Error(errorMessage);
                } else {
                    if(isFunction(this.errorValue)) {
                        this.errorValue(new Error(errorMessage), this.data, this.pattern, this.defaultValue, this.errorValue);
                    } else {
                        return this.errorValue;
                    }
                }
            }


            var ptrn = !isUndefined(level) ? level : this.pattern;
            if(isUndefined(ptrn) || isNull(ptrn) || (!isArray(ptrn) && !isString(ptrn))) {

                var errorMessage = 'level not specified';

                if (!isArray(ptrn) && !isString(ptrn)) {
                    errorMessage = 'level is not of array or string type';
                }

                if(!this.errorValue) {
                    throw new Error(errorMessage);
                } else {
                    if(isFunction(this.errorValue)) {
                        this.errorValue(new Error(errorMessage), this.data, this.pattern, this.defaultValue, this.errorValue);
                    } else {
                        return this.errorValue;
                    }
                }
            }

            if(!isArray(ptrn)) {
                ptrn = ptrn.split('.');
            }

            if (ptrn.length < 1) {
                return this.defaultValue
            }

            var localData = this.data;
            for (var i = 0; i < ptrn.length; i++) {
                localData = localData[ptrn[i]];

                if (!localData || localData === undefined) {
                    return (this.defaultValue) ? this.defaultValue : null;
                }
            }
            return localData;
        };
    };

    digger.dig = function(data, pattern, defaultValue, errorValue){
        return new digger(data, pattern, defaultValue, errorValue).dig();
    };

    var type = function(v){
        return Object.prototype.toString.call(v);
    };

    var isArray = function(v){
        return type(v) === '[object Array]';
    };

    var isString = function(v){
        return type(v) === '[object String]';
    };

    var isObject = function(v){
        return type(v) === '[object Object]';
    };

    var isFunction = function(v){
        return typeof v === 'function';
    };

    var isUndefined = function(v){
        return typeof v === 'undefined';
    };

    var isNull = function(v){
        return v === null;
    };

    return digger;
})();

if(typeof module !== "undefined") {
    module.exports = digger;
};
