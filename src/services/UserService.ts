import {User} from '../model/user';
import axios from "axios";
import {API_URL} from "./utils";

class UserService {

    public async inscription(user: Omit<User, 'id'>): Promise<User>{
       const res: User = await axios.post(`${API_URL}/inscription/`, {
         'user': user
       })
      return res;
    }
    public async getUser(id: number): Promise<User> {
        const user : User = await axios.get({API_URL}+"/users/"+id);
        return user;
    }

    private async getAllUsers(id: number): Promise<User[]> {
      const user : User[] = await axios.get({API_URL}+"/users/");
      return user;
    }


}

export default new UserService;
