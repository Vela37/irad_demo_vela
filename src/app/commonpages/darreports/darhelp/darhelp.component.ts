import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-darhelp',
  templateUrl: './darhelp.component.html',
  styleUrls: ['./darhelp.component.scss'],
})
export class DarhelpComponent implements OnInit {

    @Input() formno:any;

forms:any[]=[
{
'name':'Investisation of Road Accidents by Police',
'description':'SCHEME FOR MOTOR ACCIDENT CLAIMS FORMULATED BY DELHI HIGH COURT',
'content':' On receipt of the information of a road accident, the Investigating Officer of Police shall immediately inspect the site of accident; take photographs of the scene of the accident and the vehicle(s) involved in the accident and prepare a site plan, drawn to  cale, as to indicate the layout and width, etc., of the road(s) or place(s), as the case may be; the position of vehicle(s) and person(s) involved; and such other facts as may be relevant. In injury cases, the Investigating Officer shall also take the Photograph(s) of the  injured in the hospital. The Investigating Officer shall conduct an on the. spot enquiry by examining the eyewitnesses/Bystanders'
},

  {'name':"FORM-I",
  'description':"FIRST ACCIDENT REPORT (FAR)",
  'content':" By Investigating Officer to Claims Tribunal Within 48 hours of the receipt of intimation of the Accident Copy to Victim(s), Insurance Company and DSLSA",
   'ins': [
    
        [
          'The Investigating Officer shall intimate the accident to the Claims Tribunal by submitting First Accident Report (FAR) in Form-I within 48 hours of the receipt of intimation of the accident.'
        ],
      [
          'If the particulars of insurance policy are available, the intimation of the accident in Form-I shall be given to the Nodal Officer of the concerned Insurance Company of the offending vehicle.'
        ],
      [
          'The Investigating Officer shall furnish the copy of FAR to the victims.'
        ],
      [
          'The Investigating Officer shall furnish the copy of FAR to Delhi State Legal Services Authority (DSLSA).'
        ],
      [
          'The Investigating Officer shall upload FAR of the accident on the website of Delhi Police.'
        ]
    ]


   
},
  {
      'name':"FORM-II",
      'description':"RIGHTS OF VICTIM(S) OF ROAD ACCIDENTAND FLOW CHART OF THIS SCHEME",
      'content':"To be handed over by IO to the Victim/Family Members/Legal Representatives within 10 days of the accident",
      'ins':
            [
                [
                    'The Investigating Officer shall furnish Form-II containing the description of Rights of Victim(s) of road accidents and flow chart of this Scheme to the victim(s) (injured/legal representatives of deceased) within 10 days of the accident against a written acknowledgement.'
                ],
                [
                    'Copy of Form-II containing the acknowledgement of the victim(s) shall be filed by the Investigating Officer before the Claims Tribunal along with Detailed Accident Report (DAR).'
                ]
            ]
  },
  {
      'name':"FORM-III",
      'description':"DRIVER'S FORM",
      'content':"By Driver of the vehicle(s) to Investigating Officer Within 30 days of the Accident Copy to Victim(s) and Insurance Company",
      'ins':
            [
                [
                    'The driver of the vehicle(s) involved in the accident shall furnish the relevant information namely his name, age, gender, income, driving license, period of validity of license, vehicle registration number, particulars of the owner and insurance of the vehicle, etc., to the Investigating Officer in Form-III within 30 days of the accident. (The Investigating Officer shall provide blank Form-III to the driver who shall fill up the relevant particulars and furnish the same to Investigating Officer.)'
                ]
            ]
  },
  {
      'name':"FORM-IV",
      'description':"OWNER'S FORM",
      'content':"By Owner of the vehicle(s) to Investigating Officer Within 30 days of Accident Copy to the Victini(s) and Insurance Company",
      'ins':
            [
                [
                    'The owner of the vehicle(s) involved in the accident shall furnish the relevant information namely particulars of the driver, particulars of the insurance policy, particulars of permit and fitness etc., in Form-IV to the Investigating Officer within 30 days of the accident. (The Investigating Officer shall provide blank Form-IV to the owner of the vehicles involved in the accident whereupon the owner shall fill up the Form and furnish the same to the Investigating Officer.)'
                ]
            ]
  },
  {
      'name':"FORM-V",
      'description':"INTERIM ACCIDENT REPORT (IAR)",
      'content':"By Investigating Officer to Claims Tribunal Within 50 days of Accident Copy to Victim(s), Insurance Company and DSLSA",
      'ins':
            [
                [
                    'The Investigating Officer shall submit Interim Accident Report (MR) in Form-V before the Claims Tribunal within 50 days of the accident.'
                ],
                [
                    'The Interim Accident Report (MR) shall be accompanied with the documents mentioned therein.'
                ],
                [
                    'The copy of the Interim Accident Report (MR) along with the documents shall be furnished to the Insurance Company, victim(s) as well as Delhi State Legal Services Authority (DSLSA).'
                ]
            ]
  },
  {
      'name':"FORM-VI A",
      'description':"VICTIM'S FORM",
      'content':"By Victim(s) to Investigating Officer within 60 days of Accident Copy to Insurance Company and DSLSA",
      'ins':
            [
                [
                    'The Victim(s) of the accident shall furnish the relevant information and the documents in Form-VIA to the Investigating Officer within 60 days of the accident. (The Investigating Officer shall provide blank Form-VIA to the Victim(s) who shall fill up the relevant information/attach the relevant documents and submit the same before the Investigating Officer).'
                ]
            ]
  },
  {
      'name':"FORM-VI B",
      'description':"VICTIM'S FORM RELATING TO MINOR CHILDREN OF VICTIM(S)",
      'content':"By Victim(s) to Investigating Officer within 60 days of Accident Copy to Insurance Company, Child Welfare Committee and DSLSA",
      'ins':
            [
                [
                    'In case of any minor child/children of The Victim(s) of the accident, the Investigating Officer shall provide blank Fprm-VIB to the victim(s), who shall fill up the relevant information/attach the relevant documents and submit the same to the Investigating Officer within 60 days of the accident.'
                ],
                [
                    'The Investigating Officer shall send the copy of the Victim\'s Form-VIA and VIB along with DAR to Child Welfare Committee within 30 days of receiving the aforesaid Form-VIA and VIB from the victim(s), to ascertain if the child is a Child in Need of Care and Protection (CNCP) as per the provisions of the Juvenile Justice (Care and Projection of Children) Act, 2015.'
                ],
                [
                    'The Investigating Officer shall also send copies of Form-VIA and VIB along with the DAR to the Delhi State Legal Services Authority (DSLSA) to assign a lawyer to assist the child/children to avail their legal remedies/rights, including education, within 30 days of receiving the aforesaid Form-VIA and VIB from the victim(s).'
                ]
            ]
  },
  {
      'name':"FORM-VII",
      'description':"DETAILED ACCIDENT REPORT (DAR)",
      'content':"By Investigating Officer to Claims Tribunal within 90 days of Accident Copy to Victim(s), Driver, Owner, Insurance Company and DSLSA",
      'ins':
            [
                [
                    'The Investigating Officer shall complete the verification of the information and documents furnished by the driver and owner of the vehicle(s) involved in the accident and submit the Detailed Accident Report (DAR) with the Claims Tribunal in Form-VII within 90 days of the accident.'
                ],
                [
                    'The Detailed Accident Report (DAR) shall be accompanied with the documents mentioned in Form-VII including the Site Plan in Form-VIII, Mechanical Inspection Report in Form-IX and Verification Report in Form-X.'
                ]
            ]
  },
  {
      'name':"FORM- VIII",
      'description':"SITE PLAN",
      'content':"By Investigating Officer to Claims Tribunal Along with DAR within 90 days of Accident"
  },
  {
      'name':"FORM- IX",
      'description':"MECHANICAL INSPECTION REPORT",
      'content':"By Investigating Officer to Claims Tribunal Along with DAR within 90 days of Accident"
  },
  {
      'name':"FORM-X",
      'description':"VERIFICATION REPORT",
      'content':"By Investigating Officer to Claims Tribunal Along with DAR within 90 days of Accident through information available on VAHAN"
  },
  {
      'name':"FORM-XI",
      'description':"INSURANCE FORM",
      'content':"By Designated Officer of Insurance Company to Claims Tribunal Within 30 days of receipt of DAR",
      'ins':
            [
                [
                    'If the liability to pay the eompensation is not disputed, the Insurance Company shall take a deeision as to the quantum of compensation payable to the claimant(s) in accordance with law within 30 days of the date of receipt of the copy of DAR from the Investigating Officer.'
                ],
                [
                    'The decision taken by the Designated Officer of the Insurance Company shall be in writing and it shall be a reasoned decision.'
                ],
                [
                    'The report of the Designated Officer of the Insurance Company to be submitted before the Claims Tribunal shall be in Form —XI.'
                ],
                [
                    'However, if the Insuranee Company does not admit the liability to pay the compensation, it shall disclose the grounds of defence in Form-XI and shall file the copy of report of Surveyor/Investigator along with Form-XI.'
                ]
            ]
  
  },
  {
      'name':"FORM - XII",
      'description':"VICTIM IMPACT REPORT",
      'content':"By DSLSA to concerned Metropolitan Magistrate within 30 days of conviction and to be considered at the time of sentencing",
      'ins':
            [
                [
                    'After the conviction of the in the criminal case, the learned Metropolitan Magistrate shall send the copy of the judgment as well as the affidavit of the accused with respect to his assets and income to DSLSA whereupon DSLSA shall conduct a summary inquiry and submit a Victim Impact Report (VIR) before the learned Metropolitan Magistrate within 30 days of the conviction in terms of the Full Bench judgment of this Court in Karan v. State NCT of Delhi, Crl.A.352/2020 decided on 27th November, 2020.'
                ],
                [
                    'The Victim Impact Report formulated by the Full Bench is attached hereto as Form-XII.'
                ]
            ]
  },
  {
      'name':"FORM - XIII",
      'description':"BEFORE THE MOTOR ACCBDENT CLAIMS TRIBUNAL",
      'content':"....Petitioners(s) Versus ....Respondent(s) FORMAT OF WRITTEN SUBMISSIONS TO BE FILED BY PARTIES IN DEATH CASES"
  },
  {
      'name':"FORM - XIV",
      'description':"BEFORE THE MOTOR ACCIDENT CLAIMS TRIBUNAL",
      'content':"....Petitioners(s) Versus ....Respondent(s) FORMAT OF WRITTEN SUBMISSIONS TO BE FILED BY THE PARTIES IN INJURY CASES"
  },
  {
      'name':"FORM - XV",
      'description':"SUMMARY OF COMPUTATION OF AWARD AMOUNT IN DEATH CASES TO BE INCORPORATED IN THE AWARD",
      'content':""
  },
  {
      'name':"FORM-XVI",
      'description':"SUMMARY OF THE COMPUTATION OF AWARD AMOUNT IN INJURY CASES TO BE INCORPORATED TN THE AWARD",
      'content':""
  },
  {
      'name':"FORM - XVII",
      'description':"COMPLIANCE OF THE PROVISIONS OF THE SCHEME TO BE MENTIONED TN THE AWARD",
      'content':"",
      'ins':
            [
                [
                    'The Claims Tribunal shall incorporate the summary of computation of compensation in the award in Form-XV for death cases and in Form-XVI for injury cases.'
                ],
                [
                    'The Claims Tribunal shall deal with the compliance of this Scheme especially as to whether there has been any delay or deficiency on the part of the Investigating Officer of the Police and/or the Designated Officer of the Insurance Company.'
                ],
                [
                    'In the event of any delay or deficiency on the part of the Investigating Officer of the Police, the Claims Tribunal may consider recommending adverse entry to be made in the service record of the concerned officer, after affording an opportunity of hearing to the concerned officer.'
                ],
                [
                    'In case of delay or deficiency on the part of the Designated Officer of the Insurance Company, the Claims Tribunal may consider recommending adverse entry to be made in the service record of the concerned officer or impose cost/penal interest to be recovered from the salary of the officer in default, after affording an opportunity of hearing to the concerned officer.'
                ],
                [
                    'The Claims Tribunal shall incorporate the compliance of this Scheme in the award in Form-XVII.'
                ]
            ]
  },
  {
      'name':"FORM - XVIII",
      'description':"FORMAT OF RECORD OF AWARDS TO BE MAINTAINED BY THE CLAIMS TRIBUNAL",
      'content':"",
      'ins':
            [
                [
                    'The record of the awards passed by the Claims Tribunals shall be maintained in a chronological order according to the date of the award in such a manner that it is easy for the litigants/lawyers to ascertain whether the compensation has been received or not.'
                ],
                [
                    'The format of the record of the awards shall be in Form-XVIII.'
                ]
            ]
  },
  {
      'name':"FORM - XIX",
      'description':"MOTOR ACCIDENT CLAIMS ANNUITY DEPOSIT (MACAD) SCHEME",
      'content':""
  },
  {
    'name':"FORM - XX",
    'description':"FORMAT FOR THE INFORMATION OF MACT",
    'content':" ",
    'ins':
            [
                [
                    'STAGE – I : ACCIDENT DETAILS (to be submitted by Investigating Officer within 90 days)'
                ],
                ['STAGE – II : CLAIM DETAILS (to be provided by MACT)']
            ]
}

];

  constructor(

    private modalctrl: ModalController,

  ) {

    //this.forms[0]={'name':"Form - I",'description':"FAR",'content':' content'};

   }

  ngOnInit() {


    //this.forms[0]={'name':"Form - I",'description':"FAR",'content':' content'};
    
console.log('this.formno',this.formno);

  }
  closemodal() {

    this.modalctrl.dismiss();
  }


}
