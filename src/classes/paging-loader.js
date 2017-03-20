"use strict";
var core_1 = require("@angular/core");
var PagingLoader = (function () {
    function PagingLoader(_loadPerformer, limit, autoLoad) {
        if (limit === void 0) { limit = 50; }
        if (autoLoad === void 0) { autoLoad = false; }
        this._loadPerformer = _loadPerformer;
        this.limit = limit;
        this.loading = false;
        this.total = -1;
        this.items = [];
        this.complete = false;
        this.currentSubscription = null;
        this.onChange = new core_1.EventEmitter();
        if (autoLoad) {
            this.loadMore(true);
        }
    }
    PagingLoader.prototype.loadMore = function (first) {
        var _this = this;
        if (first === void 0) { first = false; }
        if ((!first && this.total > -1 && this.items.length >= this.total) || this.loading) {
            this.complete = true;
            return;
        }
        this.complete = false;
        this.loading = true;
        if (first) {
            this.items = [];
            this.total = -1;
        }
        var start = this.items.length;
        if (this.currentSubscription) {
            this.currentSubscription.unsubscribe();
        }
        this.currentSubscription = this._loadPerformer.performLoad(start, this.limit).subscribe(function (result) {
            _this.total = _this._loadPerformer.total;
            _this.loading = false;
            _this.lastResult = result;
            if (Array.isArray(result)) {
                if (!_this.items) {
                    _this.items = [];
                }
                _this.items = _this.items.concat(result);
            }
            else {
                console.warn('Result is not an array', result);
            }
            _this.onChange.emit(result);
        }, function (error) {
            _this.loading = false;
        });
        return this.currentSubscription;
    };
    return PagingLoader;
}());
exports.PagingLoader = PagingLoader;
//# sourceMappingURL=paging-loader.js.map