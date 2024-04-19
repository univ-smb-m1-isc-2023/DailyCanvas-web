import axios from "axios";
import {API_URL} from "./utils";
import {LocalstoreService} from "./localstore/localstore.service";

export class GenericService<T> {

    constructor(protected url: string ) {
      let localstore: LocalstoreService<string> = new LocalstoreService();
      if (localstore.get("token") !== null){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localstore.get('token')}`
      }
    }

    async getAll(): Promise<T[]> {
      const response = await axios.get<T[]>(`${API_URL}/${this.url}`);
      return response.data;
    }

    async get(id: number): Promise<T> {
      const response = await axios.get<T>(`${API_URL}/${this.url}/${id}`);
      return response.data;
    }

    async create(entity: Omit<T,"id">): Promise<T> {
      const response = await axios.post<T>(`${API_URL}/${this.url}`, entity);
      return response.data;
    }

    async update(entity: T): Promise<T> {
      const response = await axios.put<T>(`${API_URL}/${this.url}`, entity);
      return response.data;
    }

    async delete(id: number): Promise<void> {
      await axios.delete(`${API_URL}/${this.url}/${id}`);
    }
}
