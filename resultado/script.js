document.addEventListener('DOMContentLoaded', () => {
    const modalTrigger = document.getElementById('resultadoModalTrigger');
    const modalOverlay = document.getElementById('resultadoModalOverlay');
    const modalClose = document.getElementById('resultadoModalClose');
    const modalContent = document.getElementById('resultadoModalContent');
    const phoneInput = document.getElementById('resultadoModalTelefone');
    const form = document.getElementById('resultadoForm');
    const errorMessage = document.getElementById('resultadoModalError');
    const formWrapper = document.getElementById('resultadoModalFormWrapper');
    const loadingWrapper = document.getElementById('resultadoModalLoadingWrapper');
    const assinarPlanoWrapper = document.getElementById('resultadoModalAssinarPlano');
    const assinarPlanoButtons = document.querySelectorAll('.resultado-plano-card-assinatura-button');
    const nameWrapper = form.querySelector('#resultadoModalNome').closest('.resultado-modal-form-field');
    const emailWrapper = form.querySelector('#resultadoModalEmail').closest('.resultado-modal-form-field');
    const phoneWrapper = form.querySelector('#resultadoModalTelefone').closest('.resultado-modal-form-field');
    const consentWrapper = form.querySelector('#resultadoConsentimento').closest('.resultado-modal-form-field');

    // Numero aleatorio entre 5 e 10 segundos
    const LOADING_DURATION = Math.floor(Math.random() * 5000) + 5000;

    let loadingTimeoutId;

    const setVisibility = (element, shouldShow) => {
        if (shouldShow) {
            element.classList.add('is-visible');
            element.setAttribute('aria-hidden', 'false');
        } else {
            element.classList.remove('is-visible');
            element.setAttribute('aria-hidden', 'true');
        }
    };

    const showFormState = () => {
        setVisibility(formWrapper, true);
        setVisibility(loadingWrapper, false);
        setVisibility(assinarPlanoWrapper, false);
    };

    const showLoadingState = () => {
        setVisibility(formWrapper, false);
        setVisibility(loadingWrapper, true);
        setVisibility(assinarPlanoWrapper, false);
    };

    const showAssinarPlanoState = () => {
        setVisibility(formWrapper, false);
        setVisibility(loadingWrapper, false);
        setVisibility(assinarPlanoWrapper, true);
    };

    const showError = (message) => {
        errorMessage.textContent = message;
    };

    const resetError = () => {
        errorMessage.textContent = '';
    };

    const applyPhoneMask = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);

        if (digits.length <= 2) {
            return digits;
        }

        if (digits.length <= 6) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        }

        if (digits.length <= 10) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        }

        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    const setFieldError = (wrapper, message) => {
        wrapper.classList.add('is-invalid');
        wrapper.dataset.error = message;
    };

    const clearFieldError = (wrapper) => {
        wrapper.classList.remove('is-invalid');
        delete wrapper.dataset.error;
    };

    const clearAllFieldErrors = () => {
        [nameWrapper, emailWrapper, phoneWrapper, consentWrapper].forEach(clearFieldError);
    };

    const resetModalState = () => {
        form.reset();
        resetError();
        clearAllFieldErrors();
        showFormState();
    };

    const openModal = () => {
        resetModalState();
        setVisibility(modalOverlay, true);
    };

    const closeModal = () => {
        clearTimeout(loadingTimeoutId);
        setVisibility(modalOverlay, false);
    };

    const handleModalContentClick = (event) => {
        event.stopPropagation();
    };

    const handleAssinarPlanoClick = () => {
        alert('serviço indisponivel. Tente novamente mais tarde');
    };

    const validateForm = () => {
        let isValid = true;
        clearAllFieldErrors();

        const nomeValue = form.nome.value.trim();
        const emailValue = form.email.value.trim();
        const phoneValue = form.telefone.value.trim();
        const consentChecked = form.consentimento.checked;

        if (!nomeValue) {
            setFieldError(nameWrapper, 'Informe seu nome');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            setFieldError(emailWrapper, 'Informe seu email');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            setFieldError(emailWrapper, 'Email inválido');
            isValid = false;
        }

        const digits = phoneValue.replace(/\D/g, '');
        if (!phoneValue) {
            setFieldError(phoneWrapper, 'Informe seu telefone');
            isValid = false;
        } else if (digits.length < 10) {
            setFieldError(phoneWrapper, 'Telefone inválido');
            isValid = false;
        }

        if (!consentChecked) {
            setFieldError(consentWrapper, 'Consentimento obrigatório');
            isValid = false;
        }

        return isValid;
    };

    const handlePhoneInput = (event) => {
        event.target.value = applyPhoneMask(event.target.value);
        resetError();
    };

    const handleFieldInput = (event) => {
        const fieldWrapper = event.currentTarget.closest('.resultado-modal-form-field');
        if (fieldWrapper) {
            clearFieldError(fieldWrapper);
        }
        resetError();
    };

    const handleConsentChange = (event) => {
        if (event.currentTarget.checked) {
            clearFieldError(consentWrapper);
            resetError();
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            showError('Corrija os campos destacados.');
            return;
        }

        resetError();
        showLoadingState();

        loadingTimeoutId = setTimeout(() => {
            showAssinarPlanoState();
        }, LOADING_DURATION);
    };

    modalTrigger.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalContent.addEventListener('click', handleModalContentClick);
    modalOverlay.addEventListener('click', closeModal);
    assinarPlanoButtons.forEach((button) => {
        button.addEventListener('click', handleAssinarPlanoClick);
    });
    phoneInput.addEventListener('input', handlePhoneInput);
    form.nome.addEventListener('input', handleFieldInput);
    form.email.addEventListener('input', handleFieldInput);
    form.telefone.addEventListener('input', handleFieldInput);
    form.consentimento.addEventListener('change', handleConsentChange);
    form.addEventListener('submit', handleFormSubmit);
});
