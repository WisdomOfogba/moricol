import { Session } from "next-auth";
import { createClientAxios } from "./axios-client";
import { handleAxiosError } from "./index";

export interface CreateDrugOrderRequestParams {
  userId: string;
  patientName: string;
  patientAdresss: string;
  patientPhoneNumber: string;
  drugName: string;
  drugId: string;
  price: Number;
  qty: Number;
  session: Session;
}
export interface CreateAddressParams {
  userid: string;
  phone: Number;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  postalcode: Number;
  state: string;
  city: string;
  latitude: string;
  longitude: string;
  session: Session;
}
export interface AllProductsParams {
  category: string;
  subcategory: string;
  innercategory: string;
  brand: string;
  color: string;
  price: Number;
  rating: Number;
}
const onlinePharmacyUrl = "/user/pharmacy";
// endpoints to receive data from the server
const apiEndpoints = {
  productCategory: {
    retrieveBestProduct: onlinePharmacyUrl + "/best/selling/product",
    retrieveNewProduct: onlinePharmacyUrl + "/new/product",
    retrieveSingleProduct: onlinePharmacyUrl + "/retrieve/single/product",
    retrieveAllProduct: onlinePharmacyUrl + "/retrieve/all/product",
    retrieveAllCategory: onlinePharmacyUrl + "/category",
    retrieveSubCategory: onlinePharmacyUrl + "/subcategory",
    retrieveInnerCategory: onlinePharmacyUrl + "/innercategory",
  },
  address: {
    createAddress: onlinePharmacyUrl + "/create/address",
    updateAddress: onlinePharmacyUrl + "/update/address",
    getAddress: onlinePharmacyUrl + "/retrieve/default/address",
    getAllAddresses: onlinePharmacyUrl + "retrieve/all/address",
    getSingleAddresses: onlinePharmacyUrl + "retrieve/single/address",
    setDefaultAddress: onlinePharmacyUrl + "set/default/address",
    deleteAddress: onlinePharmacyUrl + "default/address",
  },
};

// post request functions  to retrive data from the server
const onlinePharmacyApi = {
  createAddress: async (params: CreateAddressParams) => {
    const { session, ...otherParams } = params;
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + apiEndpoints.address.createAddress,
        {
          ...otherParams,
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Error creating new drug order",
      );
      throw new Error(errorMessage);
    }
  },

  getAllCategories: async (session: Session): Promise<string[]> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveAllCategory,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getSubCategories: async (session: Session): Promise<string[]> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveSubCategory,

        {
          category: "66df402da60f3b195520d0f3",
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getInnerCategories: async (session: Session): Promise<string[]> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveInnerCategory,

        {
          category: "66df402da60f3b195520d0f3",
          subcategory: "66df6407a60f3b195520d136",
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching categories");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getAllProducts: async (
    session: Session,
    params: Object,
  ): Promise<string[]> => {
    const axios = createClientAxios({ session: session });
    const data = JSON.stringify(params);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveAllProduct,

        data,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching Products");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getNewProducts: async (session: Session): Promise<string[]> => {
    const axios = createClientAxios({ session: session });

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveNewProduct,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching Products");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getBestProducts: async (session: Session): Promise<string[]> => {
    const axios = createClientAxios({ session: session });

    try {
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          apiEndpoints.productCategory.retrieveBestProduct,
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Error fetching Products");
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
};

export default onlinePharmacyApi;
