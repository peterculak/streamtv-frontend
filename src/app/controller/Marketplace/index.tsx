import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import DataTable from '../../../components/DataTable/index';
import MarketplaceServiceInterface from "../../../worldfirst/Marketplace/service/MarketplaceServiceInterface";
import MarketplaceProviderServiceInterface
    from "../../../worldfirst/Marketplace/service/MarketplaceProviderServiceInterface";
import Provider from "../../../worldfirst/Marketplace/entity/Provider";

interface PropsInterface {
    marketplaceService: MarketplaceServiceInterface,
    providerService: MarketplaceProviderServiceInterface,
    match: any,
}

class MarketplaceController extends React.Component<PropsInterface, any> {
    constructor(props: PropsInterface, context: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.marketplaceService.getMarketplacesByProvider(
            this.props.providerService.getProviderByName(
                this.props.match.params.providerName)).then((r: Provider) => {
            this.setState({
                data: r,
            });
        });
    }

    render() {
        return (
            <div className="app-wrapper">

                <div className="d-flex justify-content-center">
                    <h1>Marketplaces</h1>
                </div>

                {this.state && this.state.data.length ?
                    (<DataTable data={this.state.data}></DataTable>)
                    :
                    (<CircularProgress/>)

                }

            </div>
        );
    }
}

export default MarketplaceController;
