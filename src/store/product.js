import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    isLoading: false,
    products: [],
    product: {},
    token: null
  }),
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    loggedIn(state) {
      return !!state.token
    }
  },
  actions: {
    checkPreviousLogin() {
      const existingToken = localStorage.getItem('auth_token');
      if(existingToken) {
        this.token = existingToken;
        localStorage.setItem('auth_token', JSON.stringify(existingToken));
        //axios.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
      }
    },
    login(credentials) {
      const url = 'http://www.mocky.io/v2/5b9149823100002a00939952'; // mocky.io allows us to fake a successful authentication from the server
      const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
      };

      return fetch(url,options)
              .then(response => response.json())
              .then(data => console.log(data))
              .then(data => {
                this.token = data.token;
                localStorage.setItem('auth_token', JSON.stringify(data.token));
                //axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
              })
              .catch(error => {
                console.error('API Error while authenticating user, ' + error);
                return Promise.reject(error);
              })
    },
    async fetchProducts() {
      this.products = await ProductService.getProducts()
    },
    addProduct(newProduct) {
      return ProductService.insertProduct(newProduct)
        .then(() => {
          this.products.push(newProduct)
        })
    },
    fetchProduct(id) {
      let p = this.getProductById(id);
      if(p == null) {
        ProductService.getProduct(id)
          .then(data => {
            this.product = data;
          })
      } else {
        this.product = p;
      }
    },
    deleteProduct(product) {
      return ProductService.deleteProduct(product).then(() => {
        this.products = this.products.filter(p => p.id != product.id)
      });
    },
  },
})
