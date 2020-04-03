import parseLinkHeader from './parseLinkHeader';

describe('helpers/parseLinkHeader', () => {
    describe('parseLinkHeader(response)', () => {
        describe('called with response containing Link header', () => {
            let fakeResponse;

            beforeEach(() => {
                fakeResponse = {
                    headers: {
                        get: (name) => (
                            name === 'Link'
                                ? '<https://google.com?hl=pl>; rel="google", <https://facebook.com>; rel="facebook"'
                                : ''
                        ),
                    },
                };
            });

            test('should return Object with Link header values from given response, keyed by their rels', () => {
                const result = parseLinkHeader(fakeResponse);

                expect(result).toEqual({
                    google: 'https://google.com?hl=pl',
                    facebook: 'https://facebook.com',
                });
            });
        });
        describe('called with response without Link header', () => {
            let fakeResponse;

            beforeEach(() => {
                fakeResponse = {
                    headers: {
                        get: () => null,
                    },
                };
            });

            test('should not throw error', () => {
                const testFn = () => parseLinkHeader(fakeResponse);

                expect(testFn).not.toThrow(Error);
            });
        });
    });
});
