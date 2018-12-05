import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import MarketplaceController from '../app/controller/Marketplace/index';
import ContainerInterface from "../framework/container/ContainerInterface";
import Error404 from '../app/controller/Error/Error404';

interface MainPropsInterface {
    container: ContainerInterface,
}

class Main extends React.Component<MainPropsInterface, any> {

    private container: ContainerInterface;

    constructor(props: MainPropsInterface) {
        super(props);
        this.container = props.container;
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/'
                           render={(props) => <MarketplaceController
                               providerName='amazon'
                               marketplaceService={this.container.get('marketplace.service')}
                               providerService={this.container.get(
                                   'marketplace.provider.service')}
                               {...props}
                           />}
                    />
                    <Route
                        component={Error404}/>
                </Switch>
            </main>
        );
    }
}

export default Main;
