export interface LeadListPayload {
  gofor: string;
  search_query?: string;
  service_interest?: string;
  lead_source_id?: number;
  lead_status_id?: number;
  from_date?: string;
  to_date?: string;
}

export interface ConversionPayload {
  gofor: string;
  lead_id: string;
  converted_by: string;
  deal_value: string;
  service_package: string;
  payment_status: "Paid" | "Unpaid"; 
}

export interface paymentsPayload {
    gofor : string,
    search_query: string,
    status: string,
    from_date: string,
    to_date : string
} 

export interface invoicesListPayload {
  
    gofor: string,
    search_query: string,
    status: string,
    from_date: string,
    to_date: string;
}

export interface proposalsPayload {
  
  gofor: string,
  search_query: string,
  status: string,
  from_date: string,
  to_date: string;
}