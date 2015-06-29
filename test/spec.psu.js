/** jasmine test **/
describe("event listener", function () {
    it("psu should be object", function () {
        expect(typeof (psu)).toBe('object');
    });
    it("psu.eventHandler.events should be object", function () {
        expect(typeof (psu.eventHandler.events)).toBe('object');
    });
    it("psu.eventHandler.publish should be function", function () {
        expect(typeof (psu.eventHandler.publish)).toBe('function');
    });
    describe("publish", function () {
        it("psu.eventHandler.publish should call its callback", function () {        
            var eventHandler = psu.eventHandler;
            spyOn(eventHandler, 'subscribe').andCallThrough();
            spyOn(eventHandler, 'publish').andCallThrough();
            eventHandler.subscribe('key', function (trigger, data) {
                console.log('data');
            });        
            expect(eventHandler.subscribe).toHaveBeenCalled();
            eventHandler.publish('key');
            expect(eventHandler.publish).toHaveBeenCalled();
            psu.eventHandler.unsubscribe('key');
        });
        it("psu.eventHandler.publish should accept an array of callbacks", function () {        
            var eventHandler = psu.eventHandler,
                arr = [];
            spyOn(eventHandler, 'subscribe').andCallThrough();
            spyOn(eventHandler, 'publish').andCallThrough();
            eventHandler.subscribe('key', [
 
                function (trigger, data) {
                    arr.push('1');
                },
                function (trigger, data) {
                    arr.push('2');
                }
            ]);
            eventHandler.publish('key');
            expect(eventHandler.publish).toHaveBeenCalled();
            expect(eventHandler.subscribe).toHaveBeenCalled();
            expect(arr.length).toBe(2);
            expect(psu.eventHandler.subscribers.key.length).toBe(2);
            psu.eventHandler.unsubscribe('key');
        });
    });
    describe("subscribe", function () {
        it("psu.eventHandler.subscribe should be function", function () {
            expect(typeof (psu.eventHandler.subscribe)).toBe('function');
        });
        it("psu.eventHandler.subscribe function should put event 'key' into psu.eventHandler.events", function () {
            psu.eventHandler.subscribe('key', function (trigger, data) {});
            expect(psu.eventHandler.subscribers.key).toBeDefined();
            psu.eventHandler.unsubscribe('key');
        });
        it("psu.eventHandler.subscribe function should put event 'key1' and 'key2' into psu.eventHandler.events", function () {
            psu.eventHandler.subscribe('key1 key2', function (trigger, data) {});
            expect(psu.eventHandler.subscribers.key1).toBeDefined();
            expect(psu.eventHandler.subscribers.key2).toBeDefined();
            psu.eventHandler.unsubscribe('key1 key2');
            expect(psu.eventHandler.subscribers.key1).not.toBeDefined();
            expect(psu.eventHandler.subscribers.key2).not.toBeDefined();
        });
        it("psu.eventHandler.subscribe should take an array or a function as a callback", function () {
            psu.eventHandler.subscribe('key', function (trigger, data) {
                console.log(data);
            });
            expect(psu.eventHandler.subscribers.key).toBeDefined();
            psu.eventHandler.unsubscribe('key');
            psu.eventHandler.subscribe('key', [
 
                function (trigger, data) {
                    console.log(data);
                },
                function (trigger, data) {
                    console.log(trigger)
                }
            ]);
            expect(psu.eventHandler.subscribers.key).toBeDefined();
            psu.eventHandler.unsubscribe('key');
        });
        it("psu.eventHandler.subscribe function should add events to 'key' in psu.eventHandler.events", function () {
            psu.eventHandler.subscribe('key', function (a, b) {
                console.log(data);
            });
            expect(psu.eventHandler.subscribers.key.length).toBe(1);
            psu.eventHandler.subscribe('key', function (c, d) {
                console.log(data);
            });
            expect(psu.eventHandler.subscribers.key.length).toBe(2);
            psu.eventHandler.subscribe('key', [
 
                function (e, f) {
                    console.log(data);
                }
            ]);
            expect(psu.eventHandler.subscribers.key.length).toBe(3);
            psu.eventHandler.subscribe('key', [
 
                function (g, h) {
                    console.log(data);
                },
                function (i, j) {
                    console.log(data);
                },
                function (i, j) {
                    console.log(data);
                }
            ]);
            expect(psu.eventHandler.subscribers.key.length).toBe(5);
            psu.eventHandler.unsubscribe('key');
        });
    });
    describe("unsubscribe", function () {
        it("psu.eventHandler.unsubscribe should be function", function () {
            expect(typeof (psu.eventHandler.unsubscribe)).toBe('function');
        });
        it("psu.eventHandler.unsubscribe function should remove event 'key' from psu.eventHandler.events", function () {
            psu.eventHandler.subscribe('key', function (trigger, data) {
                console.log(data);
            });
            psu.eventHandler.unsubscribe('key');
            expect(psu.eventHandler.events.key).not.toBeDefined();
        });
        it("psu.eventHandler.unsubscribe function should remove events 'key1' and 'key2' from psu.eventHandler.events", function () {
            psu.eventHandler.subscribe('key1 key2', function (trigger, data) {});
            expect(psu.eventHandler.subscribers.key1).toBeDefined();
            expect(psu.eventHandler.subscribers.key2).toBeDefined();
            psu.eventHandler.unsubscribe('key1 key2');
            expect(psu.eventHandler.subscribers.key1).not.toBeDefined();
            expect(psu.eventHandler.subscribers.key2).not.toBeDefined();
        });
    });
});
