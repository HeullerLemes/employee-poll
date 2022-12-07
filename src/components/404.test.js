import NotFoundPage from './404';
import { render } from '@testing-library/react';


test('render NotFoundPage', () => {
    var view = render(
            <NotFoundPage/>
    );
    expect(view).toMatchSnapshot();
});