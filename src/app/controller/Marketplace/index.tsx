import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import Paper from '@material-ui/core/Paper/index';
import DataTable from '../../../components/DataTable/index';
import MarketplaceServiceInterface from "../../../worldfirst/Marketplace/service/MarketplaceServiceInterface";
import MarketplaceProviderServiceInterface
    from "../../../worldfirst/Marketplace/service/MarketplaceProviderServiceInterface";
import {Theme} from '@material-ui/core/styles';

interface PropsInterface {
    marketplaceService: MarketplaceServiceInterface,
    providerService: MarketplaceProviderServiceInterface,
    providerName: string,
    match: any,
    theme: Theme,
}

class MarketplaceController extends React.Component<PropsInterface, any> {
    private readonly styles: Object = {};

    constructor(props: PropsInterface, context: any) {
        super(props, context);
        this.styles = {
            headerCell: {
                head: {
                    backgroundColor: this.props.theme.palette.primary.light,
                    color: this.props.theme.palette.common.white,
                    fontSize: 14,
                    fontWeight: 'normal',
                }
            },
            table: {
                minWidth: 700,
            },
            row: {
                '&:nth-of-type(odd)': {
                    backgroundColor: this.props.theme.palette.background.default,
                },
            },
        };
    }

    componentDidMount() {
        const provider = this.props.providerService.getProviderByName(this.props.providerName);
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
                    <h1>Amazon Marketplaces</h1>
                </div>

                {this.state && this.state.data.length ?
                    (<Paper>
                        <div className="table-responsive-material">
                            <DataTable styles={this.styles} data={this.state.data}></DataTable>
                        </div>
                    </Paper>)
                    :
                    (
                        <div className="d-flex justify-content-center">
                            <div className="loader">
                                <CircularProgress/>
                            </div>
                        </div>
                    )

                }
            </div>
        );
    }
}

export default MarketplaceController;
