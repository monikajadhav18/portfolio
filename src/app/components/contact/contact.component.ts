import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────────
// HOW TO WIRE UP EMAILJS (free, no backend needed)
// ─────────────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail works perfectly):
//    Dashboard → Email Services → Add New Service → Gmail
//    → Authorize with mvjadhav18@gmail.com → Copy the Service ID
// 3. Create an Email Template:
//    Dashboard → Email Templates → Create New Template
//    Paste the template below, then copy the Template ID:
//
//    Subject:  New message from {{from_name}} via Portfolio
//    To email: mvjadhav18@gmail.com
//    Body:
//      Name:    {{from_name}}
//      Email:   {{from_email}}
//      Subject: {{subject}}
//      Message: {{message}}
//
// 4. Get your Public Key:
//    Dashboard → Account → General → Public Key
// 5. Replace the three placeholder values below with your real IDs
// ─────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = 'service_vipvw77';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_spjzk1a';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'B3zYZbY4xBMmL9jeA';   // e.g. 'aBcDeFgHiJkLmNoP'

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

  formState: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  errorMessage = '';

  form: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  contactInfo = [
    {
      icon: 'fa-solid fa-envelope',
      label: 'Email',
      value: 'mvjadhav18@gmail.com',
      href: 'mailto:mvjadhav18@gmail.com',
      color: '#f472b6',
      colorDim: 'rgba(244,114,182,0.1)'
    },
    {
      icon: 'fa-solid fa-location-dot',
      label: 'Location',
      value: 'Nashik, Maharashtra, India',
      href: null,
      color: '#34d399',
      colorDim: 'rgba(52,211,153,0.1)'
    },
    {
      icon: 'fa-brands fa-github',
      label: 'GitHub',
      value: 'github.com/monikajadhav',
      href: 'https://github.com/monikajadhav18',
      color: '#f0f4ff',
      colorDim: 'rgba(240,244,255,0.06)'
    },
    {
      icon: 'fa-brands fa-linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/monikajadhav',
      href: 'https://www.linkedin.com/in/monika-jadhav-2b534a242/',
      color: '#0a66c2',
      colorDim: 'rgba(10,102,194,0.12)'
    }
  ];

  // get isConfigured(): boolean {
  //   return (
  //     EMAILJS_SERVICE_ID  !== 'service_vipvw77' &&
  //     EMAILJS_TEMPLATE_ID !== 'template_spjzk1a' &&
  //     EMAILJS_PUBLIC_KEY  !== 'B3zYZbY4xBMmL9jeA'
  //   );
  // }

get isConfigured(): boolean {
  return !!(
    EMAILJS_SERVICE_ID &&
    EMAILJS_TEMPLATE_ID &&
    EMAILJS_PUBLIC_KEY
  );
}

  async onSubmit() {
    if (!this.form.name.trim() || !this.form.email.trim() || !this.form.message.trim()) return;
    if (this.formState === 'sending') return;

    // Guard: show clear error if EmailJS is not yet configured
    if (!this.isConfigured) {
      this.formState = 'error';
      this.errorMessage =
        'EmailJS is not configured yet. Replace the three placeholder values ' +
        '(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) in contact.component.ts with ' +
        'your real EmailJS credentials.';
      return;
    }

    this.formState = 'sending';
    this.errorMessage = '';

    try {
      const templateParams = {
        from_name:  this.form.name.trim(),
        from_email: this.form.email.trim(),
        subject:    this.form.subject.trim() || '(No subject)',
        message:    this.form.message.trim(),
        reply_to:   this.form.email.trim()
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      if (result.status === 200) {
        this.formState = 'success';
        this.form = { name: '', email: '', subject: '', message: '' };
      } else {
        throw new Error(`EmailJS responded with status ${result.status}`);
      }
    } catch (err: any) {
      this.formState = 'error';
      this.errorMessage =
        err?.text ||
        err?.message ||
        'Something went wrong. Please try emailing directly at mvjadhav18@gmail.com';
      console.error('[Contact form] EmailJS error:', err);
    }
  }

  resetForm() {
    this.formState = 'idle';
    this.errorMessage = '';
    this.form = { name: '', email: '', subject: '', message: '' };
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    this.animElements.forEach(el => observer.observe(el.nativeElement));
  }
}
