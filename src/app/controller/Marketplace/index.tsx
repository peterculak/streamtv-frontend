import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import DataTable from '../../../components/DataTable/index';
import MarketplaceServiceInterface from "../../../worldfirst/Marketplace/service/MarketplaceServiceInterface";
import MarketplaceProviderServiceInterface
    from "../../../worldfirst/Marketplace/service/MarketplaceProviderServiceInterface";

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
        const provider = this.props.providerService.getProviderByName(this.props.match.params.providerName);
        this.props.marketplaceService.getMarketplacesByProvider(provider).then(r => {
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
