import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

interface UserResponse {
    id: string;
    name: string;
}

class user implements  UserResponse{
   id:string;
   name:string;
}

@Component({
    template: require('./list.html')
})
export class ListComponent extends Vue {

    items: UserResponse[] = [];
    protected axios;

    constructor() {
      super();
      this.axios = axios;
    }

    mounted() {
        this.$nextTick(() => {
            this.loadItems();
        });
    }

    private loadItems() {
        if (!this.items.length) {
            for(let i =0;i<15 ;i++){
                let item = new user();
                item.name = "name_"+ i;
                this.items.push(item);
            }
            
        }
    }
}
