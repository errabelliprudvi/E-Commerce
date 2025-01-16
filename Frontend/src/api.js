// api.js
export const API_URL = ''; // Replace with your base URL



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
              return fetchData(`${API_URL}/user/logout`, {method:"POST"});};            

export const  userSignUp = (signUpDetails) => {
              return fetchData(`${API_URL}/user/signup`, {
                method:"POST",
                headers:{"Content-type": "application/json"},
                body:JSON.stringify(signUpDetails),
              });};


//user API methods
export const getUserDetailsById = (userID) => fetchData(`${API_URL}/api/users/${userID}`);

export const  getUserCart = (userID) => fetchData(`${API_URL}/api/cart/${userID}`);
              
export const getUserOrders = (userId) => fetchData(`${API_URL}/api/orders/user/${userId}`);


export const addToCart =  (options) => {
              return fetchData(`${API_URL}/api/cart`,{
              method: "POST" ,
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(options),
            });};

export const removeFromCart = (options) => {
             return fetchData(`${API_URL}/api/cart/item`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(options),
              });};     
     
export const clearUserCart = (userId) => {
              return fetchData(`/api/cart/${userId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },});};           

export const placeOrder = (options) => {
              return fetchData(`${API_URL}/api/orders`, {
                method: 'POST',
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
export const getOrders = () => fetchData(`${API_URL}/api/orders`);

export const addProduct = (productData) => {
              return fetchData(`${API_URL}/api/admin/addProduct`, {
                method: "POST",
                body: productData,
              });};

export const deleteProduct = (productId) => {
              return fetchData(`${API_URL}/api/products/${productId}`, {
              method: "DELETE",
              });};

export const addCategory = (newCategory) => {
              return fetchData(`${API_URL}/api/admin/addCategory`, {
              method: "POST",
              body: newCategory,
              });};


export const updateOrderStatus = (orderId,options) => {
              return fetchData(`${API_URL}/api/orders/${orderId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(options),
            });};

export const uploadFile = (formData) =>{
              return  fetchData(`${API_URL}/api/upload/image`, {
              method: 'POST',
              body: formData,
            });};

//Payment API methods
export const createPaymentOrder = (amount) => {
            return fetchData(`${API_URL}/api/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(amount),
          });};


export const verifyPayment = (options) =>{
              return fetchData(`${API_URL}/api/verify-payment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
              });};        