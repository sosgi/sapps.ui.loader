System.register(['sosgi.framework/events', './main.html!text'], function (_export) {
    'use strict';

    var Event, TPL, service, styles, View, Loader;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    _export('start', start);

    _export('stop', stop);

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function start(ctx) {
        service = new Loader(ctx, new View(TPL));
        service.start();
    }

    function stop(ctx) {
        service.stop();
    }

    return {
        setters: [function (_sosgiFrameworkEvents) {
            Event = _sosgiFrameworkEvents.Event;
        }, function (_mainHtmlText) {
            TPL = _mainHtmlText['default'];
        }],
        execute: function () {
            service = null;
            styles = ['main.css'];

            _export('styles', styles);

            View = (function () {
                function View(tpl) {
                    _classCallCheck(this, View);

                    var div = document.createElement('div');
                    div.innerHTML = tpl;
                    document.body.appendChild(div);
                    this.$info = div.querySelector('.info');
                    this.$div = div;
                }

                _createClass(View, [{
                    key: 'info',
                    value: function info(msg) {
                        console.log(msg);
                        this.$info.innerHTML = msg;
                    }
                }, {
                    key: 'show',
                    value: function show() {
                        this.$div.style.display = 'block';
                    }
                }, {
                    key: 'hide',
                    value: function hide() {
                        this.$div.style.display = 'none';
                    }
                }]);

                return View;
            })();

            Loader = (function () {
                function Loader(ctx, view) {
                    _classCallCheck(this, Loader);

                    this.ctx = ctx;
                    this._view = view;
                }

                _createClass(Loader, [{
                    key: 'start',
                    value: function start() {
                        this._view.show();
                        this.ctx.on.bundle.add(this);
                    }
                }, {
                    key: 'stop',
                    value: function stop() {
                        this._view.hide();
                        this.ctx.on.bundle.remove(this);
                    }
                }, {
                    key: 'bundleEvent',
                    value: function bundleEvent(event) {
                        var bundle = event.bundle;
                        switch (event.type) {
                            case Event.INSTALLING:
                                this._view.info('Installing bundle:' + bundle.meta.location);
                                break;
                            case Event.INSTALLED:
                                this._view.info('Installed bundle:' + bundle.meta.location);
                                break;

                            case Event.STARTING:
                                this._view.info('Starting bundle: ' + bundle.meta.location);
                                break;
                            case Event.STARTED:
                                this._view.info('Started bundle: ' + bundle.meta.location);
                                if (['sapps.ui.main'].indexOf(bundle.meta.location) !== -1) {
                                    this._view.hide();
                                }
                                break;
                        }
                    }
                }]);

                return Loader;
            })();
        }
    };
});