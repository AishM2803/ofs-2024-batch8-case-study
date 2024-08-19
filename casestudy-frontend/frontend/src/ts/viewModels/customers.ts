import { RESTDataProvider } from "ojs/ojrestdataprovider";
import "ojs/ojtable";
type D = {
  accountId: number;
  accountType: string;
  accountBalance: number;
  accountStatus: string;
  overdraftAmount: number;
};
type K = D["accountId"];
class homePageViewModel {
  dataprovider: RESTDataProvider<K, D>;
  keyAttributes = "accountId";
  url = "http://localhost:8080/api/update-account/2";
  constructor() {
    this.dataprovider = new RESTDataProvider({
      keyAttributes: this.keyAttributes,
      url: this.url,
      transforms: {
        fetchFirst: {
          request: async (options) => {
            const url = new URL(options.url);
            const { size, offset } = options.fetchParameters;
            url.searchParams.set("limit", String(size));
            url.searchParams.set("offset", String(offset));
            return new Request(url.href);
          },
          response: async ({ body }) => {
            // We need to assign "items" to "data"
            return { data: body };
          },
        },
      },
    });
  }
}
export = homePageViewModel;
