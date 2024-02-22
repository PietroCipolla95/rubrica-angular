import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { __param } from 'tslib';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-single-anagraphic',
  templateUrl: './single-anagraphic.component.html',
  styleUrl: './single-anagraphic.component.scss'
})
export class SingleAnagraphicComponent {

  constructor(private route: ActivatedRoute) { }

  http = inject(HttpClient);
  auth = inject(AuthService)

  selectedFile: File | null = null;
  anagraphic: any = {};
  contacts: any = [];
  contact: any = {};
  newContact: any = {};
  errors: any = {};
  success: any = '';
  id: any = '';
  updatedUser: any = {
    name: null,
    notes: null,
    photo: null
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id')
      //console.log(this.id);
    })
    this.fetchAnagraphic()
    this.fetchContacts()
    console.log(this.anagraphic);
  }

  fetchAnagraphic() {
    this.http.get('http://localhost:8000/api/anagraphic/' + this.id)
      .subscribe((data: any) => {
        this.anagraphic = data.result
        //console.log(this.anagraphic);
      })
  }

  fetchContacts() {
    this.http.get('http://localhost:8000/api/anagraphic/' + this.id + '/contacts')
      .subscribe((data: any) => {
        this.contacts = data.contacts
        //console.log(this.contacts);
      })
  }

  addContact() {
    const payload = {
      contact: this.newContact.contact,
      type: this.newContact.type,
      notes: this.newContact.notes,
    }

    console.log('contact payload', payload);

    this.http.post('http://127.0.0.1:8000/api/anagraphic/' + this.id + '/contact', payload)
      .subscribe((data: any) => {
        this.newContact = {};
        this.errors = {};
        this.fetchContacts()
      })
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      // Update the selectedFile with the File object
      this.selectedFile = fileInput.files[0];
    }
  }

  updateAnagraphic() {
    console.log('Before updating:', this.anagraphic);

    this.updatedUser = {
      name: this.anagraphic.name,
      notes: this.anagraphic.notes
    }

    if (this.selectedFile) {

      this.updatedUser.photo = this.selectedFile

    }

    this.http.patch<any>('http://localhost:8000/api/anagraphic/' + this.id, this.updatedUser)
      .subscribe((data: any) => {
        console.log(this.anagraphic)
        //location.reload()
      })
  }

  updateContact(id: any) {
    console.log(this.contact);
    this.http.patch('http://localhost:8000/api/contact/' + id, this.contact)
      .subscribe((data: any) => {
        console.log(data);
        //location.reload()
      })
  }

  checkPermission(permission: string): Boolean {
    return this.auth.hasPermission(permission)
  }

}
