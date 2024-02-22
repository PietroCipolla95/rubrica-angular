import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-anagraphics-view',
  templateUrl: './anagraphics-view.component.html',
  styleUrl: './anagraphics-view.component.scss'
})
export class AnagraphicsViewComponent {

  httpClient = inject(HttpClient);
  auth = inject(AuthService)

  anagraphics: any = [];
  selectedFile: File | null = null;
  formData = {
    name: '',
    notes: '',
    photo: null
  };

  ngOnInit(): void {
    this.fetchAnagraphics()
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      // Update the selectedFile with the File object
      this.selectedFile = fileInput.files[0];
    }
  }

  fetchAnagraphics() {
    this.httpClient.get('http://127.0.0.1:8000/api/anagraphics')
      .subscribe((response: any) => {
        this.anagraphics = response.result;
      });
  }

  addAnagraphic() {

    const formData = new FormData()

    formData.append('name', this.formData.name)
    formData.append('notes', this.formData.notes)

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    console.log(this.formData);

    this.httpClient.post<any>('http://127.0.0.1:8000/api/anagraphic', formData)
      .subscribe((response) => {
        console.log(formData);
        console.log(response);
        this.fetchAnagraphics()
        this.resetForm()
        this.selectedFile = null
      })
  }

  resetForm(): void {
    this.formData = {
      name: '',
      notes: '',
      photo: null
    };
  }

  checkPermission(permission: string): Boolean {
    return this.auth.hasPermission(permission)
  }

}
