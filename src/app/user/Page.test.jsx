import 'babel-polyfill';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import jestFetchMock from 'jest-fetch-mock';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import getScrollToBottom from '../../helpers/getScrollToBottom';
import Page from './Page';

jest.mock('../../helpers/getScrollToBottom');

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

describe('app/user/Page', () => {
    const renderWithRouter = async () => {
        let component;

        await act(async () => {
            component = mount((
                <MemoryRouter>
                    <Page />
                </MemoryRouter>
            ));
        });

        return component;
    };
    let errorMock;
    beforeEach(() => {
        jestFetchMock.enableMocks();
    });
    afterEach(() => {
        jestFetchMock.resetMocks();
        jestFetchMock.disableMocks();
    });
    describe('<Page />', () => {
        test('should fetch data from https://api.github.com/users on start', async () => {
            await renderWithRouter();

            expect(fetch.mock.calls[0][0]).toBe('https://api.github.com/users');
        });

        describe('GitHub API did not respond', () => {
            beforeEach(() => {
                errorMock = jest.spyOn(console, 'error').mockImplementation();
                fetch.mockReject(new Error('no response'));
            });
            afterEach(() => {
                errorMock.mockRestore();
            });

            test('should display "Something went wrong" message', async () => {
                const component = await renderWithRouter();

                await act(async () => component.update());
                expect(component.text()).toMatch(/Something went wrong/);
            });
        });
        describe('GitHub API returns error', () => {
            let errorMessage;

            beforeEach(() => {
                errorMessage = 'Test message 1';

                fetch.mockResponse(JSON.stringify({
                    message: errorMessage,
                }));
            });

            test('should display returned error message', async () => {
                const component = await renderWithRouter();

                await act(async () => component.update());
                expect(component.text()).toMatch(new RegExp(errorMessage));
            });
        });
        describe('GitHub API returns array of users', () => {
            let items;

            beforeEach(() => {
                items = [
                    { id: 1, login: 'some login' },
                    { id: 22 },
                    { id: 3, html_url: 'some url' },
                ];

                fetch.mockResponse(JSON.stringify(items));
            });

            test('should display returned users data', async () => {
                const component = await renderWithRouter();

                await act(async () => component.update());
                expect(component.text()).toMatch(new RegExp(items[0].login));
                expect(component.text()).toMatch(new RegExp(items[1].id));
                expect(component.text()).toMatch(new RegExp(items[2].html_url));
            });
        });
        describe('user scrolls page', () => {
            let addEventListenerMock;
            beforeEach(() => {
                addEventListenerMock = jest.spyOn(window, 'addEventListener').mockImplementation();
            });
            afterEach(() => {
                addEventListenerMock.mockRestore();
            });
            describe('user scrolls near to top of page', () => {
                beforeEach(() => {
                    getScrollToBottom.mockImplementation(() => 1000);
                });
                test('should not fetch next data', async () => {
                    const component = await renderWithRouter();

                    const addEventListenerCalls = addEventListenerMock.mock.calls;

                    const scrollHandler = addEventListenerCalls[addEventListenerCalls.length - 1][1];

                    await act(async () => {
                        scrollHandler();
                        component.update();
                    });
                    expect(fetch.mock.calls.length).toBe(1);
                });
            });
            describe('user scrolls near to bottom of page', () => {
                beforeEach(() => {
                    getScrollToBottom.mockImplementation(() => 199);
                });
                test('should fetch next data', async () => {
                    const component = await renderWithRouter();

                    const addEventListenerCalls = addEventListenerMock.mock.calls;

                    const scrollHandler = addEventListenerCalls[addEventListenerCalls.length - 1][1];

                    await act(async () => {
                        scrollHandler();
                        component.update();
                    });
                    expect(fetch.mock.calls.length).toBe(2);
                });
            });
        });
    });
});
