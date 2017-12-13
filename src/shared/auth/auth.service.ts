class AuthService{

    user:any =null;
    
    // need  impliments  after
    isLogin ():boolean {

        return this.user;

    }
}

export const auth  = new AuthService();