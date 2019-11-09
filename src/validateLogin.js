export default function validate(inputs) {
    let errors = {};
    if (!inputs.username) {
        errors.username = 'Required';
    } else if (!/(?=@uws.org.sg)/.test(inputs.username)) {
        errors.username = 'Please enter email with domain @uws.org.sg';
    }
    if (!inputs.password) {
        errors.password = 'Required';
    } else if (inputs.password.length < 10) {
        errors.password = 'Password must be at least 10 characters long';
    } else if (!/(?=.*[0-9])/.test(inputs.password)) {
        errors.password = 'Password must contain a number';
    }
    return errors;
}