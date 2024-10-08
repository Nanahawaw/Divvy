import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { FormSubmission } from 'src/form/form.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendAdminNotification(formSubmission: FormSubmission) {
    await this.mailerService.sendMail({
      to: 'admin@example.com',
      subject: 'New Form Submission',
      text: `New form submission received from ${formSubmission.firstName} ${formSubmission.lastName}`,
      html: `<p>New form submission details:</p>
             <ul>
               <li>Name: ${formSubmission.firstName} ${formSubmission.lastName}</li>
               <li>Email: ${formSubmission.email}</li>
               <li>Company: ${formSubmission.companyName}</li>
               <!-- Add other fields as needed -->
             </ul>`,
    });
  }
}
