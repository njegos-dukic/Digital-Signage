import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedbackDto } from 'src/app/interfaces/feedbackDto';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  messages: FeedbackDto[] = [];
  messagesCopy: FeedbackDto[] = [];
  query: string = "";

  constructor(private messageService: MessagesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("color"))
      this.updateTheme(JSON.parse(localStorage.getItem("color") || ''));
    this.messageService.getAll().subscribe({
      next: (mes) => { this.messages = mes, this.messagesCopy = [...this.messages]; },
      error: (e) => this.toastr.error("Can't get messages from the server.", "Error")
    });
  }

  showSidebar() {
    let navigationElement: any = document.querySelector('.navigation');
    let main: any = document.querySelector('.main');
    navigationElement.classList.toggle('active');
    main.classList.toggle('active');
  }

  updateTheme(color: string) {
    if(color == '')
      return;

    localStorage.setItem("color", JSON.stringify(color));
    let r: any = document.querySelector(':root');
    r.style.setProperty('--color-primary', color);
  }

  deleteFeedback(id: number) {
    this.messageService.delete(id).subscribe({
      next: () => { this.messages = this.messages.filter(m => m.id != id); this.messagesCopy = [...this.messages]; this.toastr.success("", 'Feedback deleted.'); },
      error: () => { this.toastr.error("", "Error while deleting feedback."); }
    });
  }

  handleSearch(query: string) {
    this.messages = [...this.messagesCopy];
    if (query.length !== 0 || query !== null || query !== '') {
      this.messages = [];
      this.messagesCopy.forEach(m => {
        if (m.user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        this.messages.push(m);
      });
    }
  }
}
