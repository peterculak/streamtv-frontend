import ProviderRepositoryInterface from "../worldfirst/Marketplace/repository/ProviderRepositoryInterface";
import Provider from "../worldfirst/Marketplace/entity/Provider";

type config = {
    scheme: string,
    host: string,
    version: string
};

class ProviderRepository implements ProviderRepositoryInterface {
    private readonly api: config;
    private baseUrl: string;

    constructor(api: config) {
        this.api = api;
        this.baseUrl = `${this.api.scheme}://${this.api.host}/${this.api.version}`;
    }

    findOneByName(name: string): Provider {
        return Provider.fromObjectLiteral({id: 1, name: 'Amazon'});
    }

    getMarketplaces(provider: Provider): Promise<[]> {
        return new Promise<[]>(function (resolve, reject) {
            setTimeout(() => resolve(JSON.parse('[{"id":1,"name":"Europe","description":"Includes UK, France, Germany, Italy and Spain","developer_name":"WorldFirstLTD","developer_id":"1137-8553-9400","token_generation_url":"https://sellercentral.amazon.co.uk/gp/account-manager/home.html/ref=ag_userperms_dnav_xx_","status":true,"provider":{"id":1,"name":"Amazon","status":true},"amazon_marketplaces":[{"id":"A13V1IB3VIYZZH","name":"amazon.fr","country":"France","country_code":"FR","marketplace":null},{"id":"A1F83G8C2ARO7P","name":"amazon.co.uk","country":"United Kingdom","country_code":"UK","marketplace":null},{"id":"A1PA6795UKMFR9","name":"amazon.de","country":"Germany","country_code":"DE","marketplace":null},{"id":"A1RKKUPIHCS9HS","name":"amazon.es","country":"Spain","country_code":"ES","marketplace":null},{"id":"APJ6JRA9NG5V4","name":"amazon.it","country":"Italy","country_code":"IT","marketplace":null}]},{"id":2,"name":"North America","description":"Includes USA, Canada and Mexico","developer_name":"WorldFirstLTD","developer_id":"941515164896","token_generation_url":"https://sellercentral.amazon.com/gp/account-manager/home.html/ref=ag_userperms_dnav_xx_","status":true,"provider":{"id":1,"name":"Amazon","status":true},"amazon_marketplaces":[{"id":"A1AM78C64UM0Y8","name":"amazon.com.mx","country":"Mexico","country_code":"MX","marketplace":null},{"id":"A2EUQ1WTGCTBG2","name":"amazon.ca","country":"Canada","country_code":"CA","marketplace":null},{"id":"ATVPDKIKX0DER","name":"amazon.com","country":"US","country_code":"US","marketplace":null}]},{"id":3,"name":"Australia","description":null,"developer_name":null,"developer_id":null,"token_generation_url":null,"status":false,"provider":{"id":1,"name":"Amazon","status":true},"amazon_marketplaces":[{"id":"A39IBJ37TRP1C6","name":"amazon.com.au","country":"Australia","country_code":"AU","marketplace":null}]},{"id":4,"name":"Brazil","description":null,"developer_name":null,"developer_id":null,"token_generation_url":null,"status":false,"provider":{"id":1,"name":"Amazon","status":true},"amazon_marketplaces":[{"id":"A2Q3Y263D00KWC","name":"amazon.br","country":"Brazil","country_code":"BR","marketplace":null}]},{"id":5,"name":"China","description":null,"developer_name":null,"developer_id":null,"token_generation_url":null,"status":false,"provider":{"id":1,"name":"Amazon","status":true},"amazon_marketplaces":[{"id":"AAHKV2X7AFYLW","name":"amazon.cn","country":"China","country_code":"CN","marketplace":null}]},{"id":6,"name":"Japan","description":null,"developer_name":"WorldFirstLTD","developer_id":"722629581461","token_generation_url":"https://sellercentral.amazon.co.jp/gp/account-manager/home.html/ref=ag_userperms_dnav_xx_","status":true,"provider":{"id":1,"name":"Amazon","status":true},"amazon_marketplaces":[{"id":"A1VC38T7YXB528","name":"amazon.co.jp","country":"Japan","country_code":"JP","marketplace":null}]},{"id":7,"name":"India","description":null,"developer_name":null,"developer_id":null,"token_generation_url":null,"status":false,"provider":{"id":1,"name":"Amazon","status":true},"amazon_marketplaces":[{"id":"A21TJRUUN4KGV","name":"amazon.in","country":"India","country_code":"IN","marketplace":null}]}]')),
                50
            );
        })
    }
}

export default ProviderRepository;