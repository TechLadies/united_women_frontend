import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

    const [inputs, setInputs] = useState({ username: '', password: '' });

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const setInitialTouched = inputs => {
        const initialTouched = {};
        if (!inputs) return {};
        Object.keys(inputs).forEach(value => {
            initialTouched[value] = false;
        });
        return initialTouched;
    };

    const [touched, setTouched] = useState(setInitialTouched());

    const handleChange = e => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
    };

    const handleBlur = e => {
        e.persist();
        setTouched(c => ({...c, [e.target.name]: true}));
        setErrors(validate(inputs));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(inputs));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();  
        }
    }, [errors]);

    return {
        inputs,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    }
};

export default useForm;