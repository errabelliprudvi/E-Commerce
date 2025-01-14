// api.js
//const API_URL = "http://localhost:3000/"; // Replace with your base URL



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
export  const login = (loginDetails) => {
              return fetchData("/user/login", {
                method:"POST",
                headers:{"Content-type": "application/json"},
                body:JSON.stringify(loginDetails),
              });};

export const  logOut =  () => {
              return fetchData("/user/logout", {method:"POST"});};            

export const  signUP = (signUpDetails) => {
              return fetchData("/user/signup", {
                method:"POST",
                headers:{"Content-type": "application/json"},
                body:JSON.stringify(signUpDetails),
              });};


//user API methods
export const getUserDetailsById = (userID) => fetchData(`/api/users/${userID}`);

export const  getUserCart = (userID) => fetchData(`/api/cart/${userID}`);
              
export const getUserOrders = (userId) => fetchData(`//api/orders/user/${userId}`);


export const addToCart =  (options) => {
              return fetchData("/api/cart",{
              method: "POST" ,
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(options),
            });
            };

export const removeFromCart = (options) => {
             return fetchData('api/cart/item', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(options),
              });
             };     
             
export const placeOrder = (options) => {
              return fetchData('api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
                });
              };

            
// products API methods
export const getCategories = () => fetchData("/api/category");

export const getProducts = () => fetchData("/api/products");

export const getProductById = (id) => fetchData(`/api/products/${id}`);

export const getProductsByCategory = (catId) => fetchData(`/api/products/category/${catId}`);



//Admin API methods
export const getOrders = () => fetchData("/api/orders");

export const addProduct = (productData) => {
              return fetchData("/api/admin/addProduct", {
                method: "POST",
                body: productData,
              });};

export const deleteProduct = (productId) => {
              return fetchData(`/api/products/${productId}`, {
              method: "DELETE",
              });};

export const addCategory = (newCategory) => {
              return fetchData("/api/admin/addCategory", {
              method: "POST",
              body: newCategory,
              });};


export const updateOrderStatus = (orderId,options) => {
              return fetchData(`/api/orders/${orderId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(options),
            });
            };

export const uploadFile = (formData) =>{
              return  fetchData(`/api/upload/image`, {
              method: 'POST',
              body: formData,
            });
            };

//Payment API methods
export const createPaymentOrder = (amount) => {
            return fetchData('/api/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(amount),
          });
         };


export const verifyPayment = (options) =>{
              return fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
              });
            }         