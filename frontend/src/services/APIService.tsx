export class APIService {
    static myInstance = null;

    static getInstance(){
        return new APIService();
    }


    async GetJoke(user_input: string) {
        try{
            let response = await fetch('http://35.153.157.201:8000/api/joke/' + encodeURIComponent(user_input))
            return await response.json();
        }
        catch(error){
            console.error(error);
        }
    }
}

export default APIService