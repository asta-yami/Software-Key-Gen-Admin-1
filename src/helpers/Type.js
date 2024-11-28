class Type {

    static String = 'string';
    static Int = 'int';
    static Password = 'password';
    static Text = 'text';
    static Swicth = 'switch'

    static getType = (str) => {
        switch(str){
            case 'string':
                return 'text';
            case 'int':
                return 'number';
            case 'password':
                return 'password';
            case 'switch':
                return 'switch';
        }
    }
}


export default Type;