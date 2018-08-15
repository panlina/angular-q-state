angular.module('ng')
    .config(function ($provide) {
        $provide.decorator('$q', function ($delegate) {
            var Promise = $delegate(angular.noop).constructor;
            Object.defineProperties(Promise.prototype, {
                pending: { get: function () { return this.$$state.status <= 0; } },
                resolved: { get: function () { return this.$$state.status == 1; } },
                rejected: { get: function () { return this.$$state.status == 2; } },
                value: { get: function () { return this.pending ? undefined : this.$$state.value; } }
            });
            return $delegate;
        })
    });
