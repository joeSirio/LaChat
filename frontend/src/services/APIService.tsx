export class APIService {
    static myInstance = null;

    static getInstance(){
        return new APIService();
    }


    async GetJoke(user_input: string) {
        try{
            let url = 'http://35.153.157.201:8000'
            let response = await fetch(url + '/api/joke/' + encodeURIComponent(user_input))
            return await response.json();
        }
        catch(error){
            console.error(error);
        }
    }
}

export default APIService