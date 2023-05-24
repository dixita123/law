import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../preview.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(private p:PreviewService) { }
  html="  ${current_date} ${case.serviceCenter}\nRE: Form I-129 H-1B ${case.caseSubType} Petition for Nonimmigrant Worker\nPETITIONER: ${customer.customer_name}\nBENEFICIARY: ${beneficary.Beneficiary.beneficiarySalutation} ${beneficary.Beneficiary.beneficiaryFirstName} ${beneficary.Beneficiary.beneficiaryLastName}\n ${beneficary.Qualification}\nDear Officer:\nThis letter is written in support of the enclosed H-1B ${case.caseSubType} petition on behalf of ${beneficary.Beneficiary.beneficiarySalutation} ${beneficary.Beneficiary.beneficiaryFirstName} ${beneficary.Beneficiary.beneficiaryLastName} (hereafter “Beneficiary”) whom we wish to employ in the professional occupation of Software Engineer\n${customer.customer_name} (hereafter “Petitioner”) was established in ${customer.customer_year_established}, provides a full range of high-quality services to business sectors in the United States. The petitioner has ${customer.customer_total_employees} employees and posted gross revenues of ${customer.customer_gross_annual_income} last calendar year.\n${customer.customer_description}.\nEmployer/Employee Relationship.\nYour cooperation and assistance in approving the requested H-1B visa petition on behalf of the Beneficiary would be greatly appreciated. Should you have any further questions, please contact our office.\nSincerely,\n${customer.signatory_digital_signature}\n${customer.signatory_first_name}\n${customer.signatory_job_title}"
  ngOnInit(
   
    ): void {      this.p.html=this.html;
    }
}
