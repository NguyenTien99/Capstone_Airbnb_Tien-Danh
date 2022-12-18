import fetcher from "./fetcher";

const authAPI = {
    logIn: (values) => {
        return fetcher.post("auth/signin", values);
    },

    register: (values) => {
        return fetcher.post("auth/signup", {
            ...values,
            role: "USER",
        });
    },
}

export default authAPI;