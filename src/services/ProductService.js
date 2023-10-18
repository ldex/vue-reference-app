const baseURL = 'http://storerestservice.azurewebsites.net/api/';
const resourceName = 'products';

export default {

  getProducts() {
    const sortParams = `?$orderby=ModifiedDate%20desc`;
    const url = baseURL + resourceName + sortParams;
    const options = {
        method: 'GET', // GET is the default request type anyway
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };


    return fetch(url, options) // fetch() returns a promise containing a response object
            .then(response => response.json()) // json() will parse the content and return a promise with the data as an object, here an array
            .then(data => new Promise(resolve => setTimeout(() => resolve(data), 2100)))  // slowing down the response for testing purpose...
            .catch(error => {
                console.error('API Error, ' + error);
                return Promise.reject(error);
            })
  }

}