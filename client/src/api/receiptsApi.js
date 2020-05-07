import api from "./api";

const receiptsApi = (api) => {
  const getReceiptsForUserUrl = "api/receipt/get-user-receipts";
  const addReceiptToUserUrl = "api/receipt/add-receipt";
  const deleteReceiptUrl = "api/receipt/delete-receipt";

  const getUserReceipts = (user_id) => {
    return api.get(getReceiptsForUserUrl + "/" + user_id);
  };

  const addReceiptToUser = (receiptData) => {
    console.log("receiptData", receiptData);
    return api.post(addReceiptToUserUrl + "/" + receiptData.user_id, {
      body: JSON.stringify(receiptData),
    });
  };

  const deleteReceipt = (user_id) => {
    return api.post(deleteReceiptUrl + "/" + user_id);
  };

  return {
    getUserReceipts,
    addReceiptToUser,
    deleteReceipt,
  };
};

export default receiptsApi(api);
