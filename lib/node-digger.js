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

        this.dig = function(){
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


            if(isUndefined(this.pattern) || isNull(this.pattern) || (!isArray(this.pattern) && !isString(this.pattern))) {

                var errorMessage = 'level not specified';

                if (!isArray(this.pattern) && !isString(this.pattern)) {
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

            if(!isArray(this.pattern)) {
                this.pattern = this.pattern.split('.');
            }

            if (this.pattern.length < 1) {
                return (this.defaultValue && !isUndefined(this.defaultValue)) ? this.defaultValue : null;
            }

            var localData = this.data;
            for (var i = 0; i < this.pattern.length; i++) {

                localData = localData[this.pattern[i]];

                if (!localData || isUndefined(localData)) {
                    return (this.defaultValue && !isUndefined(this.defaultValue)) ? this.defaultValue : null;
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
