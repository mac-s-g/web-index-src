//return true if input is string
export function is_string(data) {
    return (data != null && data.constructor === String);
}

//return true if input is string and not empty
export function string_not_empty(data) {
    return (is_string(data) && data.trim().length > 0);
} 

//uc first method
//ucfirst('hi');  #'Hi'
export function ucfirst (str) {
    str += '';
    var f = str.charAt(0)
    .toUpperCase();
    return f + str.substr(1);
};

//uc first method
//ucfirst('hi');  #'Hi'
export function ucwords (str) {
    var words = str.split(' '), i;
    for (i = 0; i < words.length; i++) {
        words[i] = ucfirst(words[i]);
    }
    return words.join(' ');
};