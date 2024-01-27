import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import useValidation from './useValidation';

const useContactForm = ({
  errors,
  setErrors,
  isConsentGiven,
  setIsConsentGiven,
}) => {
  const toast = useToast();

  const { validateEmail } = useValidation();

  const formspreeEndpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Prosím, vyplňte jméno a příjmení.';
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Prosím, vyplňte e-mailovou adresu.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Prosím, vyplňte platnou e-mailovou adresu.';
    }
    if (!formData.phone) newErrors.phone = 'Prosím, vyplňte telefoní číslo.';
    if (!formData.message) newErrors.message = 'Prosím, vyplňte zprávu.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Also clear the error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (!isConsentGiven) {
      toast({
        title: 'Chybějící souhlas',
        description:
          'Prosím, zaškrtněte souhlas se zpracováním osobních údajů.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: 'Zpráva odeslána.',
            description:
              'Obdržel jsem vaši zprávu a pokusím se ozvat co nejdříve.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          e.target.reset(); // Reset the form after submission
          setIsConsentGiven(false); // Reset the consent checkbox
        } else {
          response.json().then((data) => {
            toast({
              title: 'Nastala chyba',
              description:
                'Nepodařilo se odeslat zprávu. Zkuste to prosím později.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: 'Unable to send message.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return { handleChange, handleSubmit };
};

export default useContactForm;
