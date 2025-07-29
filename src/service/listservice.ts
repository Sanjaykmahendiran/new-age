const fetchList = async (endpoint: string, queryParams?: string) => {
  try {
    const url = `https://new-age.top/App/api.php?gofor=${endpoint}${queryParams ? '&' + queryParams : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ${endpoint} service:`, error);
    throw error;
  }
};

export const AnnouncementsList = (queryParams?: string) => fetchList("announcementlist", queryParams);
export const AppointmentsList = (queryParams?: string) => fetchList("appointmentslist", queryParams);
export const AppreciationsList = (queryParams?: string) => fetchList("appreciationlist", queryParams);
export const AssignedAssetsList = (queryParams?: string) => fetchList("assignedassetlist", queryParams);
export const AttendanceList = (queryParams?: string) => fetchList("dateattendancelist", queryParams);
export const CampaignsList = (queryParams?: string) => fetchList("campaignslist", queryParams);
export const CategoryList = (queryParams?: string) => fetchList("categorylist", queryParams);
export const ComplaintList = (queryParams?: string) => fetchList("complaintlist", queryParams);
export const CreditNotesList = (queryParams?: string) => fetchList("creditnotelist", queryParams);
export const CustomersList = (queryParams?: string) => fetchList("customerslist", queryParams);
export const DateLeavesList = (queryParams?: string) => fetchList("dateleavelist", queryParams);
export const DealsList = (queryParams?: string) => fetchList("dealslist", queryParams);
export const DebitNotesList = (queryParams?: string) => fetchList("debitnotelist", queryParams);
export const DepartmentsList = (queryParams?: string) => fetchList("departmentlist", queryParams);
export const DesignationList = (queryParams?: string) => fetchList("designationlist", queryParams);
export const EmployeesList = (queryParams?: string) => fetchList("employeeslist", queryParams);
export const EstimatesList = (queryParams?: string) => fetchList("estimateslist", queryParams);
export const ExpensesList = (queryParams?: string) => fetchList("expenseslist", queryParams);
export const GoalList = (queryParams?: string) => fetchList("goaltrackinglist", queryParams);
export const GRNList = (queryParams?: string) => fetchList("grnlist", queryParams);
export const HolidaysList = (queryParams?: string) => fetchList("holidayslist", queryParams);
export const InvoicesList = (queryParams?: string) => fetchList("invoiceslist", queryParams);
export const InventoryList = (queryParams?: string) => fetchList("inventorylist", queryParams);
export const LeadsList = (queryParams?: string) => fetchList("leadslist", queryParams);
export const MonthLeavesList = (queryParams?: string) => fetchList("monthleavelist", queryParams);
export const PaymentsList = (queryParams?: string) => fetchList("paymentlist", queryParams);
export const PayrollsList = (queryParams?: string) => fetchList("payrollsList", queryParams);
export const PolicyList = (queryParams?: string) => fetchList("policylist", queryParams);
export const ProductList = (queryParams?: string) => fetchList("productlist", queryParams);
export const ProjectsList = (queryParams?: string) => fetchList("projectslist", queryParams);
export const ProposalsList = (queryParams?: string) => fetchList("proposalslist", queryParams);
export const PurchaseApprovalsList = (queryParams?: string) => fetchList("purchaseapprovallist", queryParams);
export const PurchaseOrderList = (queryParams?: string) => fetchList("purchaseorderlist", queryParams);
export const PurchaseRequestsList = (queryParams?: string) => fetchList("purchaserequestlist", queryParams);
export const PurchaseReturnList = (queryParams?: string) => fetchList("purchasereturnlist", queryParams);
export const PurchaseReturnsList = (queryParams?: string) => fetchList("purchasereturnslist", queryParams);
export const PurchasesList = (queryParams?: string) => fetchList("purchaseslist", queryParams);
export const QualityCheckList = (queryParams?: string) => fetchList("qualitychecklist", queryParams);
export const ResignationList = (queryParams?: string) => fetchList("resignationlist", queryParams);
export const SalaryList = (queryParams?: string) => fetchList("monthsalarylist", queryParams);
export const SalesReturnsList = (queryParams?: string) => fetchList("salesreturnlist", queryParams);
export const SourceList = (queryParams?: string) => fetchList("leadssoulist", queryParams);
export const StatusList = (queryParams?: string) => fetchList("leadsstalist", queryParams);
export const StockAdditionList = (queryParams?: string) => fetchList("stockadditionlist", queryParams);
export const StockAdjustmentsList = (queryParams?: string) => fetchList("stockadjustmentlist", queryParams);
export const StockManagmentList = (queryParams?: string) => fetchList("stockmanagementlist", queryParams);
export const stockTransfersList = (queryParams?: string) => fetchList("stocktransferlist", queryParams);
export const TasksList = (queryParams?: string) => fetchList("taskslist", queryParams);
export const UnAssignedAssetList = (queryParams?: string) => fetchList("unassignedassetlist", queryParams);
export const UnitsList = (queryParams?: string) => fetchList("unitlist", queryParams);
export const VendorList = (queryParams?: string) => fetchList("vendorlist", queryParams);
export const WarningList = (queryParams?: string) => fetchList("warninglist", queryParams);

// API Not given
export const SubscriptionsList = (queryParams?: string) => fetchList("subscriptionlist", queryParams);
export const KnowledgeBaseList = (queryParams?: string) => fetchList("articlelist", queryParams);
export const EventsList = (queryParams?: string) => fetchList("eventlist", queryParams);
export const StoreList = (queryParams?: string) => fetchList("storelist", queryParams);
export const FilesList = (queryParams?: string) => fetchList("filelist", queryParams);
export const TicketsList = (queryParams?: string) => fetchList("ticketlist", queryParams);
export const RolesList = (queryParams?: string) => fetchList("roleslist", queryParams);
export const ShipmentsList = (queryParams?: string) => fetchList("shipmentlist", queryParams);
export const ExpenseCategoriesList = (queryParams?: string) => fetchList("expensecategorylist", queryParams);
export const UsersList = (queryParams?: string) => fetchList("userslist", queryParams);

export const VariationsList = (queryParams?: string) => fetchList("variationlist", queryParams);
export const SellingPriceGroupList = (queryParams?: string) => fetchList("pricegrouplist", queryParams);
export const BrandsList = (queryParams?: string) => fetchList("brandlist", queryParams);
export const WarrantiesList = (queryParams?: string) => fetchList("warrantylist", queryParams);
export const OrdersList = (queryParams?: string) => fetchList("orderlist", queryParams);

export const SalesPOList = (queryParams?: string) => fetchList("salespolist", queryParams);
export const WorkOrderList = (queryParams?: string) => fetchList("workorderlist", queryParams);
export const QualityChecklistList = (queryParams?: string) => fetchList("qualitychecklists", queryParams);
export const FinishedGoodsList = (queryParams?: string) => fetchList("fglist", queryParams);
export const StoreInventoryList = (queryParams?: string) => fetchList("storeinventorylist", queryParams);
export const DispatchList = (queryParams?: string) => fetchList("dispatchlist", queryParams);

