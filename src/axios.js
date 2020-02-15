
import axios from 'axios';


const instance = axios.create({
  //Write your baseurl here
  baseURL: 'http://localhost:3300',  
 // timeout: 1000,
  //headers: {'Authorization': 'foobar'}
});

export default instance;
