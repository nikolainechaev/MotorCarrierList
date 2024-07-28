import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Contact } from '../models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  http = inject(HttpClient);
  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  });
  contacts$ = this.getContacts();
  editMode = false;
  editId: string | null = null;

  onFormSubmit() {
    const contactRequest = {
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      favorite: this.contactsForm.value.favorite
    };
    
    if (this.editMode && this.editId) {
      this.http.put(`http://localhost:5070/api/contacts/${this.editId}`, contactRequest)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.contacts$ = this.getContacts();
          this.contactsForm.reset();
          this.editMode = false;
          this.editId = null;
        }
      });
    } else {
      this.http.post('http://localhost:5070/api/contacts', contactRequest)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.contacts$ = this.getContacts();
          this.contactsForm.reset();
        }
      });
    }
  }

  onEdit(contact: Contact) {
    this.contactsForm.patchValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      favorite: contact.favorite
    });
    this.editMode = true;
    this.editId = contact.id;
  }

  onDelete(id: string) {
    this.http.delete(`http://localhost:5070/api/contacts/${id}`)
    .subscribe({
      next: (value) => {
        alert('Item deleted');
        this.contacts$ = this.getContacts();
      }
    });
  }

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:5070/api/contacts');
  }
}
