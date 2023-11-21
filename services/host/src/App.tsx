import {Link, Outlet} from 'react-router-dom';
import {adminRoutes} from '@packages/shared/src/routes/admin';
import {shopRoutes} from '@packages/shared/src/routes/shop';

export const App = () => {

    return (
        <div>
            <h1>HOST</h1>
            <Link to={adminRoutes.admin}>Admin</Link>
            <br/>
            <Link to={shopRoutes.shop}>Shop</Link>
            <Outlet/>
        </div>
    );
};