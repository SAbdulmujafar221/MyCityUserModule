// src/features/form/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  enabled: false,
  currentFrame: 0, 
};

const formSlice = createSlice({
  name: 'merchantForm',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    nextFrame: (state) => {
      const totalFields = 22; 
      const maxFrame = Math.ceil(totalFields / 5) - 1; 
      if (state.currentFrame < maxFrame) state.currentFrame += 1;
    },
    prevFrame: (state) => {
      if (state.currentFrame > 0) state.currentFrame -= 1;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, nextFrame, prevFrame, resetForm } = formSlice.actions;
export default formSlice.reducer;