import fetcher from "./fetcher";

const locationAPI = {

    getLocation: () => {
        return fetcher.get("vi-tri");
    }
}


export default locationAPI;