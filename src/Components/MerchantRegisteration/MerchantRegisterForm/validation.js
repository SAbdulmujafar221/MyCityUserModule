export const validateField = (name, value) => {
    if (value === undefined || value === null) return true;
  
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/\s/.test(value) ?
          true : 'Invalid email format, no spaces';
      case 'contactPhoneNumber':
        return /^\d{10}$/.test(value) ?
          true : 'Must be exactly 10 digits';
      case 'bankAccountNumber':
        return /^\d{9,18}$/.test(value) ?
          true : 'Must be 9-18 digits';
      // For non-important fields, we validate silently (used in filterInput)
      case 'merchantId':
        return /^[A-Za-z0-9-]{6,20}$/.test(value) && !/\s/.test(value);
      case 'businessName':
        return /^[A-Za-z0-9&'-][A-Za-z0-9\s&'-]{0,48}[A-Za-z0-9&'-]?$/.test(value);
      case 'registrationNumber':
        return /^[A-Za-z0-9-]{8,20}$/.test(value) && !/\s/.test(value);
      case 'contactPersonName':
        return /^[A-Za-z][A-Za-z\s'-]{0,48}[A-Za-z]?$/.test(value);
      case 'businessAddress':
        return /^[\w,.-][\w\s,.-]{0,98}[\w,.-]?$/.test(value);
      case 'businessWebsite':
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?$/.test(value) && !/\s/.test(value);
      case 'businessCategory':
        return /^[A-Za-z][A-Za-z\s-]{0,28}[A-Za-z]?$/.test(value);
      case 'incorporationDate':
        const date = new Date(value);
        const now = new Date();
        return (date < now && date > new Date('1900-01-01') && !/\s/.test(value));
      case 'legalDocumentType':
        return /^[A-Za-z][A-Za-z\s]{0,28}[A-Za-z]?$/.test(value);
      case 'legalDocumentNumber':
        return /^[A-Za-z0-9-]{6,20}$/.test(value) && !/\s/.test(value);
      case 'legalDocumentImageUrl':
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?$/.test(value) && !/\s/.test(value);
      case 'proofOfAddressDocumentType':
        return /^[A-Za-z][A-Za-z\s]{0,28}[A-Za-z]?$/.test(value);
      case 'proofOfAddressDocumentNumber':
        return /^[A-Za-z0-9-]{6,20}$/.test(value) && !/\s/.test(value);
      case 'proofOfAddressDocumentImageUrl':
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?$/.test(value) && !/\s/.test(value);
      case 'bankIfscCode':
        return /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(value) && !/\s/.test(value);
      case 'bankAccountHolderName':
        return /^[A-Za-z][A-Za-z\s'-]{0,48}[A-Za-z]?$/.test(value);
      case 'kycVerified':
        return typeof value === 'boolean';
      case 'kycVerificationStatus':
        return ['pending', 'verified', 'rejected'].includes(value) && !/\s/.test(value);
      case 'enabled':
        return typeof value === 'boolean';
      default:
        return true;
    }
  };
  
  export const filterInput = (name, value) => {
    if (!value) return '';
    
    switch (name) {
      case 'merchantId':
      case 'registrationNumber':
      case 'legalDocumentNumber':
      case 'proofOfAddressDocumentNumber':
        return value.replace(/[^A-Za-z0-9-]/g, '').slice(0, 20);
      case 'businessName':
        return value.replace(/[^A-Za-z0-9\s&'-]/g, '').slice(0, 50);
      case 'contactPersonName':
      case 'bankAccountHolderName':
        return value.replace(/[^A-Za-z\s'-]/g, '').slice(0, 50);
      case 'businessAddress':
        return value.replace(/[^A-Za-z0-9\s,.-]/g, '').slice(0, 100);
      case 'businessWebsite':
      case 'legalDocumentImageUrl':
      case 'proofOfAddressDocumentImageUrl':
        return value.replace(/\s/g, '').slice(0, 100);
      case 'businessCategory':
        return value.replace(/[^A-Za-z\s-]/g, '').slice(0, 30);
      case 'incorporationDate':
        return value; // Date input handles its own validation
      case 'legalDocumentType':
      case 'proofOfAddressDocumentType':
        return value.replace(/[^A-Za-z\s]/g, '').slice(0, 30);
      case 'bankIfscCode':
        return value.replace(/[^A-Za-z0-9]/g, '').slice(0, 11);
      case 'kycVerificationStatus':
        return value.replace(/\s/g, '').slice(0, 10);
      default:
        return value;
    }
  };
  
  export const requiredFields = [
    'merchantId', 'businessName', 'registrationNumber', 'email',
    'contactPersonName', 'contactPhoneNumber', 'businessAddress',
    'bankAccountNumber', 'bankIfscCode', 'bankAccountHolderName'
  ];