import { Component, Vue } from 'vue-property-decorator';

import {NavbarComponent} from './layout/navbar'

@Component({
    template: require('./app.component.html'),
    components: { 'navbar':NavbarComponent}
})

export class AppComponent extends Vue {
  
}