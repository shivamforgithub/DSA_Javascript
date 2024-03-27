import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ENV_PARAMS } from '../../../config/default';
import { Transport, TransportOptions } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
import { Readable } from 'stream';


export type EmailAttributes = {
  from: string;
  to: string | string[];
  bcc?: string;
  subject: string;
  body?: string;
  htmlBody?: string | Buffer | Readable | Mail.AttachmentLike
  attachments?: any[];
};
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV_PARAMS.smtpHost,
      port: ENV_PARAMS.smtpPort,
      auth: {
        user: ENV_PARAMS.smtpEmailUser,
        pass: ENV_PARAMS.smtpEmailPassword,
      },
    } as TransportOptions | Transport<any>);
  }

  sendEmail(data: EmailAttributes) {
    const { from, to, bcc, subject, body, attachments, htmlBody } = data;

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          from,
          to,
          bcc,
          subject,
          text: body,
          attachments,
          html: htmlBody
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        },
      );
    });
  }
}
