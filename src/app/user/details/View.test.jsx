import 'babel-polyfill';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import jestFetchMock from 'jest-fetch-mock';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import View from './View';

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

describe('app/details/View', () => {
    let errorMock;
    beforeEach(() => {
        jestFetchMock.enableMocks();
        errorMock = jest.spyOn(console, 'error').mockImplementation();
    });
    afterEach(() => {
        jestFetchMock.resetMocks();
        jestFetchMock.disableMocks();
        errorMock.mockRestore();
    });
    describe('<View />', () => {
        const renderViewWithRouter = async (login) => {
            let component;

            await act(async () => {
                component = mount((
                    <MemoryRouter initialEntries={[`/${login}`]}>
                        <Route path="/:login">
                            <View />
                        </Route>
                    </MemoryRouter>
                ));
            });

            return component;
        };
        let login;

        beforeEach(() => {
            login = 'testLogin';
        });

        test('should fetch data from https://api.github.com/users/:login on start', async () => {
            await renderViewWithRouter(login);

            expect(fetch.mock.calls[0][0]).toBe(`https://api.github.com/users/${login}`);
        });

        describe('GitHub API returns error', () => {
            beforeEach(() => {
                fetch.mockReject(new Error('no response'));
            });

            test('should display error message', async () => {
                const component = await renderViewWithRouter(login);

                component.update();
                expect(component.text()).toMatch(/Something went wrong/);
            });
        });

        describe('GitHub API returns user data', () => {
            let data;

            beforeEach(() => {
                data = {
                    login,
                    id: 22,
                    name: 'test name',
                    email: 'test@email.com',
                    html_url: 'https://google.com',
                    blog: 'https://medium.com',
                    followers: 999,
                    public_repos: 2,
                };

                fetch.mockResponse(JSON.stringify(data));
            });

            test('should display returned user data', async () => {
                const component = await renderViewWithRouter(login);

                component.update();
                expect(component.text()).toMatch(new RegExp(data.id));
                expect(component.text()).toMatch(new RegExp(data.login));
                expect(component.text()).toMatch(new RegExp(data.name));
                expect(component.text()).toMatch(new RegExp(data.email));
                expect(component.text()).toMatch(new RegExp(data.html_url));
                expect(component.text()).toMatch(new RegExp(data.blog));
                expect(component.text()).toMatch(new RegExp(data.followers));
                expect(component.text()).toMatch(new RegExp(data.public_repos));
            });
        });
    });
});
