import { Product } from "../types/product.type"
import { SuccessResponse } from "../types/utils.type"
import api from "./api"

const URL = "products"
const productApi = {
    getProduct() {
        return api.get<SuccessResponse<Product[]>>(URL)
    },
}

export default productApi
