import api from "./api"

const URL = "products"
const productApi = {
    getProduct(params: ProductListConfig) {
        return api.get(URL, { params })
    },
}

export default productApi
