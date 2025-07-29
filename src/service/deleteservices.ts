const deleteEntity = async (entity: string, id: string) => {
  const response = await fetch(`https://new-age.top/App/api.php?gofor=${entity}&${id}`);

  if (!response.ok) {
    throw new Error("Failed to Fetch Data");
  }

  return await response.json();
};

export const DeleteLead = (lead_id: string) => deleteEntity("leaddelete", `lead_id=${lead_id}`);
export const DeleteDeal = (deal_id: string) => deleteEntity("dealsdelete", `deal_id=${deal_id}`);
export const DeleteEstimate = (estimate_id: string) => deleteEntity("estimatesdelete", `estimate_id=${estimate_id}`);
export const DeleteProposal = (proposal_id: string) => deleteEntity("proposalsdelete", `proposal_id=${proposal_id}`);
export const DeleteInvoice = (invoice_id: string) => deleteEntity("invoicesdelete", `invoice_id=${invoice_id}`);
export const DeleteTask = (task_id: string) => deleteEntity("deletetask", `task_id=${task_id}`);
export const DeleteCustomer = (customer_id: string) => deleteEntity("deletecustomer", `customer_id=${customer_id}`);
export const DeleteExpense = (expense_id: string) => deleteEntity("deleteexpense", `expense_id=${expense_id}`);
export const DeleteProject = (project_id: string) => deleteEntity("deleteproject", `project_id=${project_id}`);
export const DeleteCampaign = (campaign_id: string) => deleteEntity("deletecampaign", `campaign_id=${campaign_id}`);
export const DeleteAnnouncement = (announcement_id: string) => deleteEntity("deleteannouncement", `announcement_id=${announcement_id}`);
export const CancelHoliday = (holiday_id: string) => deleteEntity("cancelholiday", `holiday_id=${holiday_id}`);
export const DeleteDepartment = (department_id: string) => deleteEntity("deletedepartment", `department_id=${department_id}`);
export const DeleteAppreciation = (appreciation_id: string) => deleteEntity("deleteappreciation", `appreciation_id=${appreciation_id}`);
export const DeleteWarning = (warning_id: string) => deleteEntity("deletewarning", `warning_id=${warning_id}`);
export const DeleteResignation = (resignation_id: string) => deleteEntity("deleteresignation", `resignation_id=${resignation_id}`);
export const DeleteComplaint = (complaint_id: string) => deleteEntity("deletecomplaint", `complaint_id=${complaint_id}`);
export const DeleteDesignation = (designation_id: string) => deleteEntity("deletedesignation", `designation_id=${designation_id}`);
export const DeletePolicy = (policy_id: string) => deleteEntity("deletepolicy", `policy_id=${policy_id}`);
export const DeleteAsset = (asset_id: string) => deleteEntity("deleteasset", `asset_id=${asset_id}`);
export const DeleteSalary = (salary_id: string) => deleteEntity("deletesalary", `salary_id=${salary_id}`);
export const DeleteLeave = (leave_id: string) => deleteEntity("leavedelate", `leave_id=${leave_id}`);
export const DeleteStatus = (status_id: string) => deleteEntity("deletestatus", `status_id=${status_id}`);
export const DeleteSource = (source_id: string) => deleteEntity("deletesource", `source_id=${source_id}`);
export const DeleteEmployee = (employee_id: string) => deleteEntity("deleteemployee", `employee_id=${employee_id}`);
export const DeleteGRN = (grn_id: string) => deleteEntity("deletegrn", `grn_id=${grn_id}`);
export const DeletePurchaseApproval = (purchase_approval_id: string) => deleteEntity("deletepurchaseapproval", `purchase_approval_id=${purchase_approval_id}`);
export const DeletePurchaseRequest = (purchase_request_id: string) => deleteEntity("deletepurchaserequest", `purchase_request_id=${purchase_request_id}`);
export const DeletePurchaseReturn = (return_id: string) => deleteEntity("deletepurchasereturn", `return_id=${return_id}`);
export const DeletePurchaseOrder = (purchase_order_id: string) => deleteEntity("deletepurchaseorder", `purchase_order_id=${purchase_order_id}`);
export const DeleteQC = (quality_check_id: string) => deleteEntity("deletequalitycheck", `quality_check_id=${quality_check_id}`);
export const DeleteSalesReturn = (sales_return_id: string) => deleteEntity("deletesalesreturn", `sales_return_id=${sales_return_id}`);
export const DeleteStockAddition = (stock_id: string) => deleteEntity("deletestockaddition", `stock_id=${stock_id}`);
export const DeleteAdjustment = (adjustment_id: string) => deleteEntity("deleteadjustment", `adjustment_id=${adjustment_id}`);
export const DeleteStock = (stock_id: string) => deleteEntity("deletestock", `stock_id=${stock_id}`);
export const DeleteTransfer = (transfer_id: string) => deleteEntity("deletetransfer", `transfer_id=${transfer_id}`);
export const DeleteGoal = (goal_id: string) => deleteEntity("deletegoal", `goal_id=${goal_id}`);
export const DeleteProduct = (product_id: string) => deleteEntity("deleteproduct", `product_id=${product_id}`);
export const DeleteCategory = (category_id: string) => deleteEntity("deletecategory", `category_id=${category_id}`);
export const DeleteInventory = (inventory_id: string) => deleteEntity("deleteinventory", `inventory_id=${inventory_id}`);
export const DeletePayment = (payment_id: string) => deleteEntity("deletepayment", `payment_id=${payment_id}`);
export const DeleteDebitNote = (debit_note_id: string) => deleteEntity("deletedebitnote", `debit_note_id=${debit_note_id}`);
export const DeleteCreditNote = (credit_note_id: string) => deleteEntity("deletecreditnote", `credit_note_id=${credit_note_id}`);


export const DeleteSubscription = (subscription_id: string) => deleteEntity("deletesubscription", `subscription_id=${subscription_id}`);
export const DeleteArticle = (article_id: string) => deleteEntity("deletearticle", `article_id=${article_id}`);
export const DeleteEvent = (event_id: string) => deleteEntity("deleteevent", `event_id=${event_id}`);
export const DeleteStore = (store_id: string) => deleteEntity("deletestore", `store_id=${store_id}`);
export const DeleteFile = (file_id: string) => deleteEntity("deletefile", `file_id=${file_id}`);
export const DeleteTicket = (ticket_id: string) => deleteEntity("deleteticket", `ticket_id=${ticket_id}`);
export const DeleteUser = (user_id: string) => deleteEntity("deleteuser", `user_id=${user_id}`);
export const DeleteRole = (role_id: string) => deleteEntity("deleterole", `role_id=${role_id}`);
export const DeleteShipment = (shipment_id: string) => deleteEntity("deleteshipment", `shipment_id=${shipment_id}`);
export const DeleteExpenseCategory = (ecid: string) => deleteEntity("deleteexpensecategory", `ecid=${ecid}`);
export const DeleteVariation = (vid: string) => deleteEntity("deletevariation", `vid=${vid}`);
export const DeleteSellingPriceGroup = (pgid: string) => deleteEntity("deletepricegroup", `pgid=${pgid}`);
export const DeleteBrand = (brand_id: string) => deleteEntity("deletebrand", `brand_id=${brand_id}`);
export const Deletewarranty = (warranty_id: string) => deleteEntity("deletewarranty", `warranty_id=${warranty_id}`);
export const DeleteDispatch = (dispatch_id: string) => deleteEntity("deletedispatch", `dispatch_id=${dispatch_id}`);
export const DeleteSalesPO = (salespo_id: string) => deleteEntity("deletesalespo", `salespo_id=${salespo_id}`);
export const DeleteWorkOrder = (work_order_id: string) => deleteEntity("deleteworkorder", `work_order_id=${work_order_id}`);
export const DeleteQualityChecklist = (checklist_id: string) => deleteEntity("deletequalitychecklist", `checklist_id=${checklist_id}`);
export const DeleteFinishedGoods = (fg_batch_id: string) => deleteEntity("deletefg", `fg_batch_id=${fg_batch_id}`); 
export const DeleteStoreInventory = (inventory_id: string) => deleteEntity("deletestoreinventory", `inventory_id=${inventory_id}`);
export const DeleteOrder = (order_id: string) => deleteEntity("deleteorder", `order_id=${order_id}`);