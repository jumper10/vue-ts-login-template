import { Component, Vue } from 'vue-property-decorator';
import { Logger } from '../../util/log';
import { auth } from '../../shared/auth/auth.service';
import { setTimeout } from 'timers';

@Component({
    template: require('./login.html')
})
export class loginComponent extends Vue {
    data (){
        return {
   username:'',
   password:''
}
}

    protected logger: Logger;
    repo: string = 'https://github.com/jumper10/vue';

    mounted() {
        if (!this.logger) this.logger = new Logger();
        this.$nextTick(() => this.logger.info('about is ready!'));
    }

    login(){
        auth.user = {};
        this.$router.push('/')

    }
}
