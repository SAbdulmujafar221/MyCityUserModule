export const initialState = {
    currentFrame: 0,
    merchantId: '',
    businessName: '',
    registrationNumber: '',
    email: '',
    contactPersonName: '',
    contactPhoneNumber: '',
    businessAddress: '',
    businessWebsite: '',
    businessCategory: '',
    incorporationDate: '',
    legalDocumentType: '',
    legalDocumentNumber: '',
    legalDocumentImageUrl: '',
    proofOfAddressDocumentType: '',
    proofOfAddressDocumentNumber: '',
    proofOfAddressDocumentImageUrl: '',
    bankAccountNumber: '',
    bankIfscCode: '',
    bankAccountHolderName: '',
    kycVerified: false,
    kycVerificationStatus: '',
    enabled: false
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return { ...state, [action.field]: action.value };
      case 'NEXT_FRAME':
        return { ...state, currentFrame: state.currentFrame + 1 };
      case 'PREV_FRAME':
        return { ...state, currentFrame: state.currentFrame - 1 };
      default:
        return state;
    }
  };