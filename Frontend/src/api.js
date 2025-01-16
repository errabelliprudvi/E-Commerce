// api.js
const API_URL = import.meta.env.AWS_URL ||'http://15.207.40.188:3000'; // Replace with your base URL

//const apiUrl = import.meta.env.VITE_API_URL;

const getMethodOptions = {method:"GET",credentials: 'include', };
// Utility function for fetching data

const fetchData = async (url, options = {}) => {
                    try {
                         const response = await fetch(url, options);
                         if (!response.ok) 
                            {
                               throw new Error("Failed to fetch data");
                             }
                          return await response.json();
                        } catch (error) {
                          throw error;
                        }};


                        
 
// login /logOut and SignUP API Methods
export  const userlogin = (loginDetails) => {
              return fetchData(`${API_URL}/user/login`, {
                method:"POST",
                headers:{"Content-type": "application/json"},
                body:JSON.stringify(loginDetails),
              });};

export const  userlogOut =  () => {
              return fetchData(`${API_URL}/user/logout`, {method: 'POST',credentials: 'include',});};            

export const  userSignUp = (signUpDetails) => {
              return fetchData(`${API_URL}/user/signup`, {
                method:"POST",
                headers:{"Content-type": "application/json"},
                body:JSON.stringify(signUpDetails),
              });};


//user API methods
export const getUserDetailsById = (userID) => fetchData(`${API_URL}/api/users/${userID}`,getMethodOptions );

export const  getUserCart = (userID) => fetchData(`${API_URL}/api/cart/${userID}`,getMethodOptions);
              
export const getUserOrders = (userId) => fetchData(`${API_URL}/api/orders/user/${userId}`,getMethodOptions);


export const addToCart =  (options) => {
              return fetchData(`${API_URL}/api/cart`,{
              method: "POST" ,
              credentials: 'include',
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(options),
            });};

export const removeFromCart = (options) => {
             return fetchData(`${API_URL}/api/cart/item`, {
              method: 'DELETE',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(options),
              });};     
     
export const clearUserCart = (userId) => {
              return fetchData(`${API_URL}/api/cart/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },});};           

export const placeOrder = (options) => {
              return fetchData(`${API_URL}/api/orders`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
                });};

            
// products API methods
export const getCategories = () => fetchData(`${API_URL}/api/category`);

export const getProducts = () => fetchData(`${API_URL}/api/products`);

export const getProductById = (id) => fetchData(`${API_URL}/api/products/${id}`);

export const getProductsByCategory = (catId) => fetchData(`${API_URL}/api/products/category/${catId}`);



//Admin API methods
export const getOrders = () => fetchData(`${API_URL}/api/orders`,getMethodOptions);

export const addProduct = (productData) => {
              return fetchData(`${API_URL}/api/admin/addProduct`, {
                method: "POST",
                credentials: 'include',
                body: productData,
              });};

export const deleteProduct = (productId) => {
              return fetchData(`${API_URL}/api/products/${productId}`, {
              method: "DELETE",
              credentials: 'include',
              });};

export const addCategory = (newCategory) => {
              return fetchData(`${API_URL}/api/admin/addCategory`, {
              method: "POST",
              credentials: 'include',
              body: newCategory,
              });};


export const updateOrderStatus = (orderId,options) => {
              return fetchData(`${API_URL}/api/orders/${orderId}`, {
              method: "PUT",
              credentials: 'include',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(options),
            });};

export const uploadFile = (formData) =>{
              return  fetchData(`${API_URL}/api/upload/image`, {
              method: 'POST',
              credentials: 'include',
              body: formData,
            });};

//Payment API methods
export const createPaymentOrder = (options) => {
            return fetchData(`${API_URL}/api/payment/createOrder`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
          });};


export const verifyPayment = (options) =>{
              return fetchData(`${API_URL}/api/payment/verifyPayment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
              });};        