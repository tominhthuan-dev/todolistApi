import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000"
});


//request interceptor
axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
});

// RESPONSE INTERCEPTOR batws moi 401
axiosClient.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry ) {

            console.log( "Access Token hết hạn" );

            originalRequest._retry = true;

            try {

                const refreshToken = localStorage.getItem("refreshToken");

                console.log("Refresh token:", refreshToken);

                const refreshResponse = await axios.post(
                    "http://localhost:3000/auth/refresh",
                    {
                        refresh_token: refreshToken,
                    }
                );

                const newAccessToken = refreshResponse.data.access_token;

                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosClient( originalRequest );

            } catch {

                localStorage.removeItem( "token" );

                localStorage.removeItem( "refreshToken" );

                return Promise.reject( error );
            }
        }

        return Promise.reject( error );
    }
);

export default axiosClient;