import getScrollToBottom from './getScrollToBottom';

describe('helpers/getScrollToBottom', () => {
    describe('getScrollToBottom()', () => {
        let windowHeight;
        let documentHeight;
        let scrollOffset;
        beforeEach(() => {
            documentHeight = 2000;
            windowHeight = 1000;
            scrollOffset = 600;

            delete global.window;
            delete global.document;

            global.document = {
                body: {
                    scrollHeight: documentHeight,
                },
            };
            global.window = {
                innerHeight: windowHeight,
                pageYOffset: scrollOffset,
            };
        });
        test('return number of pixels left to end of page for current window scroll', () => {
            const result = getScrollToBottom();

            expect(result).toBe(400);
        });
    });
});
